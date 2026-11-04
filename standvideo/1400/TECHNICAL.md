# How it works

The kernel bug, the reclaim, the ring 0 bootstrap and the handle teardown are
the same as in the Lua version of afterglow and are not repeated here.

This file covers what is specific to running it out of the browser.

## The two stages

The browser host does not reach the kernel by itself. It runs in two stages:

1. **`jb.js`** — the raw13g host. It builds the in-process primitive from
   WebKit and hands over four things, and only these four:

   | | |
   |---|---|
   | `sc(num, ...args)` | syscall with an arbitrary number, returns `{lo, hi, i32}` |
   | `bufAddr(arrayBuffer)` | address of a backing store |
   | `p.read1/4/8`, `p.write1/4/8`, `p.readInto` | memory in this process |
   | `keepAlive` | an array, so buffers survive the collector |

2. **`afterglow.js`** — the kernel exploit, which uses nothing else. There is
   no requirement for a way to call native code: the only `native.fcall` in the
   exploit enters a stub that is itself `SYS_syscall(11, body)`, which a host
   with a syscall primitive issues directly.

That boundary is why the same exploit drives both hosts. Anything offering the
four above can carry it.

`probeAfterglow()` fires nothing and answers whether the current process can
carry the exploit at all; `runAfterglow()` is the live chain.

## Which loader, decided by content

There are two forms of enabler image, and from the outside they look alike:

| Form | How it is recognised | Path taken |
|---|---|---|
| raw payload | begins with `e9` (jmp rel32) | map it, start a thread |
| composite image | exactly 964,440 bytes | patch chain, trampoline, padding RW |

`loadEnabler` in `afterglow.js` decides on the content, **not** on the file
name. Deciding by name sends a raw payload down the composite path, where the
length check rejects it.

## The kernel patch set

GoldHEN expects to find a patched kernel. afterglow's own fifteen patches cover
25 of the 51 write sites; the thirty that are missing — one block around
`0x125791` and three singles — are exactly the ones GoldHEN's code looks for.

`patchset.bin` (641 bytes, position independent, ends in `ret`) therefore runs
before **every** GoldHEN payload, in both image forms.

## Two guards

* **The referrer guard.** The run page arms the chain only when it was reached
  from `index.html` in the same directory. The console's browser restores the
  last page it had open; without this, a page left on the armed chain would run
  it again with nobody in front of the screen. The guard sits in `jb.js`, not
  in the server, so it holds however the files are served.
* **`no-store` on every response.** The console's browser holds on to modules,
  and a corrected file would otherwise never arrive. `serve.sh` sets it; any
  other server used instead has to do the same.

## The ps4-hen offset

`kpayload/source/offsets/1400.c` gives `sceSblPfsSetKeys_addr = 0x006272B0`.
The function starts at `0x00627270`.

* The two call sites ps4-hen hooks itself (`mountpfs__sceSblPfsSetKeys_hook1`
  at `0x06a39f9`, `hook2` at `0x06a3c2a`) contain `call` instructions whose
  target is `0x0627270`.
* Three calls in the kernel point at `0x0627270`, none at `0x006272B0`.
* `0x0627270` begins `55 48 89 e5`; `0x006272B0` is `89 45 d0`, mid function.

The hook replaces both call sites and then calls the "original" 64 bytes past
its entry, on every PFS mount — that is, on every application launch.

`RsaesPkcs1v15Dec2048CRT_addr = 0x0021BFC0` has no prologue either (nearest at
`0x0021BD20`), but it is never called directly, so this is unconfirmed.

## Scope

The kernel patch lives until the console reboots. Nothing here persists.
