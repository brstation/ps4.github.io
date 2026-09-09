# Fork - PS4 WebKit Exploit (5.05 – 13.00)

A static WebKit exploits chain for the PlayStation 4. Everything runs in the
console's browser.

## Usage

1. Open the browser on your PS4 and go to https://ps4.dpdns.org

## Credits

- **Jordy** — SLOPKIT, the PS5 webkit.
- **GoldHEN team** — `payload.bin` is
  [GoldHEN](https://github.com/GoldHEN/GoldHEN), redistributed unmodified.
- The `aio` use-after-free and the IPv6 `pktopts` reclaim strategy behind
  `lapse` and `poops` are public PS4/PS5 community research. The kernel patch
  blobs come from published patch sources.
- **[rawgame4 team](https://github.com/rawgame4/rawgame4.github.io)** — the PS4 port, the kernel chains, the offset tables and the delivery layer.
- **[GamerHack](https://github.com/GamerHack/GamerHack.github.io)** — the kernel chains, the offset tables and the delivery layer.

## Disclaimer

For research and homebrew on hardware you own. Kernel exploits can crash a
console or corrupt storage, so don't run this on a system holding data you
can't lose. Nothing here enables piracy and no game content is included.
