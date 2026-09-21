# PS4JB asset inventory (phase 1 pull)
## Unique kpatch / patch FW keys
600.bin, 620.bin, 650.bin, 670.bin, 700.bin, 750.bin, 800.bin, 850.bin, 900.bin, 903.bin, 950.bin, 1000.bin, 1050.bin, 1100.bin, 1102.bin, 1150.bin, 1200.bin, 1250.bin, 1300.bin, 1302.bin, 1304.bin, 1350.bin, 1352.bin

## Chains layout
- `chains/badhoist/` — 3 files; entry: `index.html`
- `chains/cssfontface/` — 30 files; entry: `index.html`
- `chains/psfree-lapse/` — 52 files; entry: `index.html`
- `chains/relapse/` — 9 files; entry: `NONE`
- `chains/slopkit/` — 16 files; entry: `index.html`

## Offset / constants tables
- `chains/cssfontface/ps4/constants.js`
- `chains/psfree-lapse/module/offset.mjs`
- `chains/relapse/ps4_offsets.js`
- `chains/slopkit/ps4_offsets.js`
- `ps4_offsets.js`
- `third_party/B4411M-all/11/ps4_offsets.js`
- `third_party/B4411M-all/1113/ps4_offsets.js`
- `third_party/B4411M-all/13/ps4_offsets.mjs`
- `third_party/B4411M-all/6/constants.js`
- `third_party/B4411M-all/6/offsets.mjs`
- `third_party/B4411M-all/6/ps4/constants.js`
- `third_party/B4411M-all/6/ps4/offsets.mjs`
- `third_party/B4411M-all/gd/ps4_offsets.js`
- `third_party/B4411M-all/new/ps4_offsets.js`
- `third_party/CSSFontFace-Exploit/src/ps4/constants.js`
- `third_party/b4411m/offsets/constants-6.js`
- `third_party/b4411m/offsets/offsets-6.mjs`
- `third_party/b4411m/offsets/ps4_offsets-11.js`
- `third_party/b4411m/offsets/ps4_offsets-1113.js`
- `third_party/b4411m/offsets/ps4_offsets-13.mjs`
- `third_party/b4411m/offsets/ps4_offsets-gd.js`
- `third_party/b4411m/offsets/ps4_offsets-new.js`
- `third_party/cssfontface/offsets/constants-ntfargo.js`
- `third_party/cssfontface/offsets/constants.js`
- `third_party/webkitty/offsets/constants.js`
- `third_party/webkitty/offsets/offset-psfree-lapse.mjs`
- `third_party/webkitty/offsets/ps4_offsets-relapse.js`
- `third_party/webkitty/offsets/ps4_offsets-slopkit.js`
- `third_party/webkitty/offsets/ps4_offsets.js`

## Licenses / notices
- `LICENSE` — OK
- `NOTICE` — OK
- `chains/LICENSE.WebKitty-AGPL-3.0` — OK
- `third_party/licenses/WebKitty-AGPL-3.0.txt` — OK
- `third_party/licenses/CSSFontFace-Exploit-MIT.txt` — OK
- `third_party/licenses/B4411M-all-LICENSE.txt` — OK
- `third_party/ATTRIBUTION/SOURCES.md` — OK

## Router wiring
- Default: 700–1102 → `chains/cssfontface/` (untested); 1302/1304/1350/1352 → `jb.html` (proven)
- Manual: `?chain=cssfontface|psfree|slopkit|relapse`
- BadHoist 6.70–6.72: assets only
