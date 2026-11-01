# PS4 WebKit Exploit (10.01, 11.00 – 13.00)

A static WebKit exploit chain for the PlayStation 4. Everything runs in the
console's browser, so any static web host will serve it.

Based on SLOPKIT by Jordy, originally written for the PS5. Our team ported it to
PS4 and brought the `lapse` and `poops` kernel exploits onto it to cover
firmware up to 13.00.

The 10.01 block was derived offline from that firmware's own decrypted modules
and kernel and has not been run on a console yet. Every value it carries is
byte-checked on the console before anything is armed, so a wrong one stops the
run instead of damaging anything.

## Firmware support

The chain is selected automatically from the browser's User-Agent.

| Firmware | Chain | Tested on hardware |
| -------- | ----- | ------------------ |
| 10.01 | lapse | No |
| 11.00 | lapse | Yes |
| 11.50 | lapse | Yes |
| 12.00 | lapse | Yes |
| 12.02 | lapse | Yes |
| 12.50 | poops | Yes |
| 12.52 | poops | Yes |
| 13.00 | poops | Yes |

## Usage

1. Open the browser on your PS4 and go to https://rawgame4.github.io/
2. Wait for `CACHED (first run)`. This stores everything in AppCache so later
   runs work offline.
3. Press X to start.

The exploit is not deterministic. A failed attempt usually crashes the browser
or reboots the console, so just reload and try again. If it keeps failing after
a lot of reloads, close the browser fully and reopen it.

Options:

| Parameter | Effect |
| --------- | ------ |
| `?bug=lapse` / `?bug=poops` | Force a chain instead of detecting firmware |
| `?verbose=1` | Full log lines instead of the compacted form |
| `?slots=N` | Override the carrier array size |
| `?payload=1` | Run the payload even if kernel patching was skipped |

## How it works

`core.js` builds an addrof/fakeobj pair in JavaScriptCore and turns it into
arbitrary read/write inside the WebProcess. `mem.js` and `int64.js` wrap that
into a 64-bit memory interface.

From there `chain_lapse.js` and `chain_poops.js` hit the kernel's async I/O
syscalls (`aio_submit_cmd`, `aio_multi_delete`, `aio_multi_poll`) for a
use-after-free, then reclaim the freed object with IPv6 socket options
(`IPV6_RTHDR`, `IPV6_2292PKTOPTIONS`) to reach kernel read/write.

Post-exploitation runs in order, each step gated on the previous one verifying:
escalate to root, escape the sandbox through `fd_rdir`/`fd_jdir`, apply the
firmware's patch blob from `patches/` (read back and byte-checked before it is
enabled), then map and run `payload.bin`.

## Hosting it yourself

Two things have to be right:

- `cache.appcache` must be served as `text/cache-manifest`, or the page reports
  `CACHE FAILED`.
- The manifest itself should not be cached, or consoles keep running an old
  build.

The included `.htaccess` handles both on Apache. GitHub Pages sets the right
MIME type but ignores `.htaccess`, so after an update expect a short delay
before a console picks up the new manifest.

Note that `cache.appcache` pins a sha256 for every file. If you edit anything,
regenerate its hash or that entry will be treated as stale.

## Credits

- **Jordy** — SLOPKIT, the PS5 webkit.
- **GoldHEN team** — `payload.bin` is
  [GoldHEN](https://github.com/GoldHEN/GoldHEN), redistributed unmodified.
- The `aio` use-after-free and the IPv6 `pktopts` reclaim strategy behind
  `lapse` and `poops` are public PS4/PS5 community research. The kernel patch
  blobs come from published patch sources.
- Our team — the PS4 port, the kernel chains, the offset tables and the
  delivery layer.

## License

Our port work is MIT, see [LICENSE](LICENSE). Bundled third-party components
keep their own terms and are excluded from it: the SLOPKIT primitive layer,
GoldHEN, and the kernel patch blobs.

## Disclaimer

For research and homebrew on hardware you own. Kernel exploits can crash a
console or corrupt storage, so don't run this on a system holding data you
can't lose. Nothing here enables piracy and no game content is included.
