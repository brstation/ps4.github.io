# Fork - PS4 WebKit Exploit (11.00 – 13.00)

A static WebKit exploit chain for the PlayStation 4. Everything runs in the
console's browser.

Based on SLOPKIT by Jordy, originally written for the PS5. Our team ported it to
PS4 and brought the `lapse` and `poops` kernel exploits onto it to cover
firmware up to 13.00.

## Firmware support

The chain is selected automatically from the browser's User-Agent.

| Firmware | Chain | Tested on hardware |
| -------- | ----- | ------------------ |
| 11.00 | lapse | Yes |
| 11.50 | lapse | Yes |
| 12.00 | lapse | Yes |
| 12.02 | lapse | Yes |
| 12.50 | poops | Yes |
| 12.52 | poops | Yes |
| 13.00 | poops | Yes |

## Usage

1. Open the browser on your PS4 and go to https://ps4.dpdns.org/
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

## Credits

- **Jordy** — SLOPKIT, the PS5 webkit.
- **GoldHEN team** — `payload.bin` is
  [GoldHEN](https://github.com/GoldHEN/GoldHEN), redistributed unmodified.
- The `aio` use-after-free and the IPv6 `pktopts` reclaim strategy behind
  `lapse` and `poops` are public PS4/PS5 community research. The kernel patch
  blobs come from published patch sources.
- **[rawgame4 team](https://github.com/rawgame4/rawgame4.github.io)** — the PS4 port, the kernel chains, the offset tables and the delivery layer.

## License

Our port work is MIT, see [LICENSE](LICENSE). Bundled third-party components
keep their own terms and are excluded from it: the SLOPKIT primitive layer,
GoldHEN, and the kernel patch blobs.

## Disclaimer

For research and homebrew on hardware you own. Kernel exploits can crash a
console or corrupt storage, so don't run this on a system holding data you
can't lose. Nothing here enables piracy and no game content is included.
