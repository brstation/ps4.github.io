# PS4JB

PS4 jailbreak / HEN host.

**Created by X-F1REBALL-X**

**Live:** https://x-f1reball-x.github.io/PS4JB/

## Firmwares

| Firmware | Chain | Status |
| --- | --- | --- |
| 13.02, 13.04, 13.50, 13.52 | Relapse | Working on this host |
| 7.00 – 11.02 | CSSFontFace + Lapse | Auto (untested on this host) |
| 11.03 – 12.02 | Slopkit | Auto (untested on this host) |
| 12.50 – 13.00 | Slopkit | Auto (untested on this host) |
| 6.00 – 6.69 | CSSFontFace + Lapse | Auto (untested on this host) |
| 6.70 – 6.72 | BadHoist | Entry page (limited) |
| 7.00 – 9.60 | PSFree + Lapse | `?chain=psfree` (untested) |

Router auto-picks CSSFontFace (6.00–6.69 / 7.00–11.02), BadHoist (6.70–6.72), Slopkit (11.03–12.02 / 12.50–13.00), Relapse (13.02–13.52). Override with `?chain=cssfontface|psfree|slopkit|relapse|badhoist` or `?force=1`.

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
