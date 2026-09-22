# PS4JB

PS4 jailbreak / HEN host.

**Created by X-F1REBALL-X**

**Live:** https://x-f1reball-x.github.io/PS4JB/

## Firmwares

| Firmware | Chain | Status |
| --- | --- | --- |
| 13.02, 13.04, 13.50, 13.52 | Slopkit Relapse | Working on this host |
| 12.50 – 13.00 | Slopkit Netctrl | Auto (untested on this host) |
| 11.03 – 12.02 | Slopkit Lapse | Auto (untested on this host) |
| 7.00 – 11.02 | CSSFontFace + Lapse | Auto (untested on this host) |
| 7.00 – 9.60 | PSFree + Lapse | `?chain=psfree` (untested) |
| 6.70 – 6.72 | BadHoist | Entry page (limited) |
| 6.00 – 6.69 | CSSFontFace + Lapse | Auto (untested on this host) |

Router auto-picks the chain by firmware. Override with `?chain=cssfontface|psfree|slopkit|relapse|badhoist` or `?force=1`.

## How to use

### 1. Block Sony updates (DNS)

1. Settings → Network → Set Up Internet Connection.
2. Use **Custom** setup.
3. DNS Settings: **Manual**.
4. Primary DNS: `62.210.38.117`
5. Leave Secondary DNS empty.
6. Save and test connection (fail to Sony is OK).

DNS by **Nomadic** — blocks official system updates.

### 2. Browser

1. Open the PS4 Internet Browser.
2. Clear Cookies and Clear Cache (Options menu).
3. Open: https://x-f1reball-x.github.io/PS4JB/
4. Add the page to **Favorites**.

### 3. Jailbreak

1. Open the favorite / link.
2. Wait for cache (`Cache ready`), then the jailbreak starts.
3. Wait for success (the page tries to close).
4. If it fails, restart the console and try again.

## Layout

- `index.html` — FW detect, cache, Slopkit Relapse jailbreak (one page)
- `jb.js` — Slopkit Relapse 13.02–13.52
- `chains/cssfontface/` — CSSFontFace + Lapse/Netctrl
- `chains/psfree-lapse/` — PSFree + Lapse
- `chains/slopkit/` — Slopkit Lapse (11.xx–12.02) / Netctrl (12.50–13.00)
- `chains/badhoist/` — assets only
- `third_party/` — mirrored patches / offsets / licenses

## License

See `LICENSE`, `NOTICE`, and `third_party/licenses/`.
