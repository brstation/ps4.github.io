# PS4JB

PS4 jailbreak / HEN host.

**Created by X-F1REBALL-X**

**Live:** https://x-f1reball-x.github.io/PS4JB/

## Firmwares

| Firmware | Chain | Status |
| --- | --- | --- |
| 13.02, 13.04, 13.50, 13.52 | Relapse (existing) | Working on this host |
| 7.00 – 11.02 | CSSFontFace + Lapse | Wired (assets from WebKitty / ntfargo) — **untested on this host** |
| 7.00 – 9.60 | PSFree + Lapse | Wired entry (`?chain=psfree`) — **untested** |
| 11.00 – 12.02 | Slopkit + Lapse | Wired entry (`?chain=slopkit`) — **untested** |
| 12.50 – 13.00 | Slopkit + Netctrl | Wired entry (`?chain=slopkit`) — **untested** |
| 6.70 – 6.72 | BadHoist | Assets only — not wired |

Router auto-picks CSSFontFace for 7.00–11.02 and Relapse for 13.02–13.52. Override with `?chain=cssfontface|psfree|slopkit|relapse` or `?force=1`.

## Setup

1. Open the live link on the PS4 browser.
2. Wait for the countdown, then press **X** to start.
3. Wait for jailbreak / HEN success.
4. If it fails, restart the console and try again.

## Layout

- `index.html` — FW detect + chain router
- `jb.html` / `jb.js` — Relapse 13.02–13.52 (unchanged flow)
- `chains/cssfontface/` — CSSFontFace + Lapse/Netctrl
- `chains/psfree-lapse/` — PSFree + Lapse
- `chains/slopkit/` — Slopkit Lapse/Netctrl
- `chains/badhoist/` — assets only
- `third_party/` — mirrored patches / offsets / licenses (WebKitty, CSSFontFace-Exploit, B4411M)

## License / NOTICE

Vendored WebKitty chain code is **AGPL-3.0**. See `LICENSE`, `NOTICE`, and `third_party/licenses/`.

## Credits

- **Created by:** X-F1REBALL-X
- **HEN / GoldHEN:** SiSTRo · ctn · Kameleon
- **Exploit / chain:** TheFloW · Gezine · WhiteShadow · ufm42 · Nathan Fargo · Dr.Yenyen · ArabPixel · MasterMaind · ABC · raw13g · Echo Stretch · anonymous (PSFree) · Fire30 · Sleirsgoevy
- **Hosts / assets:** ArabPixel/WebKitty (AGPL-3.0) · ntfargo/CSSFontFace-Exploit · B4411M/all · DestoryG/CSSFontFace-DGHost
