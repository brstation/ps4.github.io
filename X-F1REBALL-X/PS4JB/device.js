/* Device label for non-PS4 block screen. Prefer Client Hints; UA is fallback. */
/* device.js?v=3 — bump query when changing maps (cache bust). */

var DEVICE_MODEL_NAMES = {
  "2107113SG": "Xiaomi 11T Pro",
  "2201116PG": "POCO X4 Pro",
  "2201116SG": "Redmi Note 11 Pro",
  "2201117TG": "Redmi Note 11",
  "2201123G": "Xiaomi 12",
  "2210132C": "Xiaomi 13 Pro",
  "2211133C": "Xiaomi 13",
  "22126RN91Y": "Redmi 12",
  "23021RAA2Y": "Redmi Note 12",
  "23049PCD8G": "POCO F5",
  "23076RA4BC": "Redmi Note 12 Pro",
  "23076RN8DY": "Redmi 13C",
  "23078PND5G": "Xiaomi 14",
  "2311DRK48G": "POCO X6 Pro",
  "23124RA7EO": "Redmi Note 13",
  "23127PN0CG": "Xiaomi 14 Pro",
  "2312DRA50G": "Redmi Note 13 Pro",
  "24069PC21G": "POCO F6",
  "2406APNFAG": "Xiaomi 14T Pro",
  "2407FPN8EG": "Xiaomi 14T",
  "24090RA29G": "Redmi Note 14",
  "24117RN76E": "Redmi Note 14 Pro",
  "CPH2381": "OnePlus Nord CE 2 Lite",
  "CPH2399": "OnePlus Nord 2T",
  "CPH2413": "OnePlus 10 Pro",
  "CPH2415": "OnePlus 10T",
  "CPH2417": "OnePlus Nord 2T",
  "CPH2423": "OnePlus 11",
  "CPH2449": "OnePlus 11",
  "CPH2451": "OnePlus Nord 3",
  "CPH2467": "OnePlus Open",
  "CPH2491": "OnePlus Nord CE 3 Lite",
  "CPH2493": "OnePlus Nord CE 3",
  "CPH2551": "OnePlus Nord CE4",
  "CPH2573": "OnePlus 12",
  "CPH2581": "OnePlus 12",
  "CPH2609": "OnePlus 12R",
  "CPH2613": "OnePlus Nord 4",
  "CPH2645": "OnePlus 13",
  "CPH2653": "OnePlus 13",
  "CPH2655": "OnePlus 13R",
  "CPH2747": "OnePlus 15",
  "M2007J20CG": "POCO X3 NFC",
  "M2101K6G": "Redmi Note 10 Pro",
  "Pixel 4a": "Google Pixel 4a",
  "Pixel 5": "Google Pixel 5",
  "Pixel 6": "Google Pixel 6",
  "Pixel 6 Pro": "Google Pixel 6 Pro",
  "Pixel 6a": "Google Pixel 6a",
  "Pixel 7": "Google Pixel 7",
  "Pixel 7 Pro": "Google Pixel 7 Pro",
  "Pixel 7a": "Google Pixel 7a",
  "Pixel 8": "Google Pixel 8",
  "Pixel 8 Pro": "Google Pixel 8 Pro",
  "Pixel 8a": "Google Pixel 8a",
  "Pixel 9": "Google Pixel 9",
  "Pixel 9 Pro": "Google Pixel 9 Pro",
  "Pixel 9 Pro XL": "Google Pixel 9 Pro XL",
  "Pixel 9a": "Google Pixel 9a",
  "Pixel Tablet": "Google Pixel Tablet",
  "SM-A155F": "Samsung Galaxy A15",
  "SM-A256B": "Samsung Galaxy A25",
  "SM-A356B": "Samsung Galaxy A35",
  "SM-A536B": "Samsung Galaxy A53",
  "SM-A546B": "Samsung Galaxy A54",
  "SM-A556B": "Samsung Galaxy A55",
  "SM-F731B": "Samsung Galaxy Z Flip5",
  "SM-F741B": "Samsung Galaxy Z Flip6",
  "SM-F946B": "Samsung Galaxy Z Fold5",
  "SM-F956B": "Samsung Galaxy Z Fold6",
  "SM-G991B": "Samsung Galaxy S21",
  "SM-G996B": "Samsung Galaxy S21+",
  "SM-G998B": "Samsung Galaxy S21 Ultra",
  "SM-S901B": "Samsung Galaxy S22",
  "SM-S908B": "Samsung Galaxy S22 Ultra",
  "SM-S911B": "Samsung Galaxy S23",
  "SM-S916B": "Samsung Galaxy S23+",
  "SM-S918B": "Samsung Galaxy S23 Ultra",
  "SM-S921B": "Samsung Galaxy S24",
  "SM-S926B": "Samsung Galaxy S24+",
  "SM-S928B": "Samsung Galaxy S24 Ultra",
  "SM-S931B": "Samsung Galaxy S25",
  "SM-S936B": "Samsung Galaxy S25+",
  "SM-S938B": "Samsung Galaxy S25 Ultra",
  "SM-X210": "Samsung Galaxy Tab A9",
  "SM-X510": "Samsung Galaxy Tab S9 FE",
  "SM-X710": "Samsung Galaxy Tab S9",
  "SM-X810": "Samsung Galaxy Tab S9+",
  "SM-X910": "Samsung Galaxy Tab S9 Ultra",
};

function normalizeModelKey(model) {
  if (!model) return "";
  var s = String(model).trim();
  // Prefer CPH#### / SM-XXXX tokens inside longer strings
  var cph = /\b(CPH\d{3,}\w*)\b/i.exec(s);
  if (cph) return cph[1].toUpperCase();
  var sm = /\b(SM-[A-Z0-9]+)\b/i.exec(s);
  if (sm) return sm[1].toUpperCase();
  var pixel = /\b(Pixel(?:\s+(?:Tablet|\d+[a-zA-Z]*\s*(?:Pro(?:\s*XL)?)?))?)\b/i.exec(s);
  if (pixel) return pixel[1].replace(/\s+/g, " ").trim();
  return s;
}

function marketingNameForModel(model) {
  if (!model) return "";
  var key = normalizeModelKey(model);
  var upper = key.toUpperCase();
  if (DEVICE_MODEL_NAMES[key]) return DEVICE_MODEL_NAMES[key];
  if (DEVICE_MODEL_NAMES[upper]) return DEVICE_MODEL_NAMES[upper];
  // Strip region suffix variants for Samsung SM-S928B vs SM-S928U
  var smBase = /^(SM-[A-Z]\d+)/i.exec(upper);
  if (smBase) {
    for (var k in DEVICE_MODEL_NAMES) {
      if (k.indexOf(smBase[1]) === 0) return DEVICE_MODEL_NAMES[k];
    }
  }
  if (/^CPH\d+/i.test(key)) return "OnePlus";
  if (/^SM-/i.test(key)) return "Samsung";
  if (/^Pixel/i.test(key)) return key.indexOf("Google") === 0 ? key : ("Google " + key);
  if (/Redmi|220|230|240|241|M20|M21/i.test(key)) return "Xiaomi / Redmi";
  if (/^POCO/i.test(key)) return "POCO";
  if (/^ONEPLUS/i.test(key)) return key.replace(/^ONEPLUS[\s_-]*/i, "OnePlus ");
  if (/^iPhone/i.test(key)) return "Apple iPhone";
  if (/^iPad/i.test(key)) return "Apple iPad";
  return "";
}

function detectDeviceFromUa(ua) {
  ua = ua || "";
  if (/PlayStation 5/i.test(ua)) return "PlayStation 5";
  if (/PlayStation 4/i.test(ua)) return "PlayStation 4";
  if (/PlayStation Vita|PS Vita/i.test(ua)) return "PS Vita";
  if (/iPhone/.test(ua)) {
    var im = /iPhone OS (\d+)[._](\d+)/.exec(ua);
    return im ? ("Apple iPhone (iOS " + im[1] + "." + im[2] + ")") : "Apple iPhone";
  }
  if (/iPad/.test(ua)) {
    var pm = /CPU OS (\d+)[._](\d+)/.exec(ua);
    return pm ? ("Apple iPad (iPadOS " + pm[1] + "." + pm[2] + ")") : "Apple iPad";
  }
  if (/Android/.test(ua)) {
    var am = /Android ([\d.]+)/.exec(ua);
    var brand = /;\s*([^;)]+?)\s+Build\//.exec(ua);
    var raw = brand ? brand[1].replace(/\s+/g, " ").trim() : "";
    var market = marketingNameForModel(raw);
    var code = normalizeModelKey(raw) || raw;
    var name;
    if (market && code && market !== code) name = market + " · " + code;
    else name = market || code || "Android phone";
    if (am && (am[1] === "10" || am[1].indexOf("10.") === 0)) {
      return name + " (checking real Android version…)";
    }
    return am ? (name + " (Android " + am[1] + ")") : name;
  }
  if (/Windows NT/.test(ua)) {
    var wm = /Windows NT ([\d.]+)/.exec(ua);
    var ver = { "10.0": "10/11", "6.3": "8.1", "6.2": "8", "6.1": "7" };
    var w = wm ? (ver[wm[1]] || wm[1]) : "";
    var browser = /Edg\//.test(ua) ? "Edge" : (/Firefox\//.test(ua) ? "Firefox" : (/Chrome\//.test(ua) ? "Chrome" : ""));
    var label = w ? ("Windows PC (" + w + ")") : "Windows PC";
    return browser ? (label + " · " + browser) : label;
  }
  if (/Macintosh|Mac OS X/.test(ua)) {
    var mm = /Mac OS X (\d+)[._](\d+)/.exec(ua);
    var mac = mm ? ("Mac (macOS " + mm[1] + "." + mm[2] + ")") : "Mac";
    if (/iPhone|iPad/.test(ua) === false && /Mobile/.test(ua)) return mac;
    return mac;
  }
  if (/CrOS/.test(ua)) return "Google Chromebook";
  if (/Linux/.test(ua)) return "Linux PC";
  if (/Mobile/.test(ua)) return "Mobile device";
  return "Unknown device";
}

function formatDeviceHints(uaFallback, hints) {
  if (!hints) return uaFallback;
  var model = (hints.model || "").trim();
  var platVer = (hints.platformVersion || "").trim();
  var platform = (hints.platform || "").trim();
  var formFactor = "";
  try {
    if (hints.formFactors && hints.formFactors.length) formFactor = hints.formFactors[0];
    else if (hints.formFactor) formFactor = hints.formFactor;
  } catch (e) {}
  if (!platform && navigator.userAgentData) {
    platform = navigator.userAgentData.platform || "";
  }
  var code = normalizeModelKey(model) || model;
  var market = marketingNameForModel(model || code);
  var ver = platVer ? platVer.split(".")[0] : "";
  var tablet = /Tablet/i.test(formFactor) || /iPad|Tab\b/i.test(model);

  if (/Android/i.test(platform) || /Android/i.test(uaFallback)) {
    var parts = [];
    if (market) parts.push(market);
    if (code && code !== market) parts.push(code);
    var head = parts.length ? parts.join(" · ") : (code || "Android device");
    if (tablet && head.indexOf("Tab") < 0 && head.indexOf("Tablet") < 0) {
      head += " tablet";
    }
    if (ver) return head + " (Android " + ver + ")";
    return head + " (Android)";
  }

  if (/iPhone|iOS|iPadOS/i.test(platform) || /iPhone|iPad/.test(uaFallback)) {
    var apple = /iPad/i.test(uaFallback) || /iPad/i.test(formFactor) ? "Apple iPad" : "Apple iPhone";
    if (ver) return apple + " (iOS/iPadOS " + ver + ")";
    return apple;
  }

  if (/macOS|Mac/i.test(platform) || /Mac \(macOS/.test(uaFallback)) {
    return ver ? ("Apple Mac (macOS " + ver + ")") : (uaFallback || "Apple Mac");
  }

  if (/Windows/i.test(platform) || /Windows PC/.test(uaFallback)) {
    return ver ? ("Windows PC (" + ver + ")") : (uaFallback || "Windows PC");
  }

  if (market && code && market !== code) {
    return ver ? (market + " · " + code + " (" + platform + " " + ver + ")") : (market + " · " + code);
  }
  if (code && platVer) return code + " (" + platform + " " + platVer + ")";
  if (code) return code;
  return uaFallback;
}

function resolveDeviceLabel(ua, done) {
  var fallback = detectDeviceFromUa(ua);
  try {
    if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
      navigator.userAgentData
        .getHighEntropyValues(["model", "platformVersion", "platform", "formFactor", "formFactors"])
        .then(function (hints) {
          done(formatDeviceHints(fallback, hints));
        })
        .catch(function () {
          done(fallback);
        });
      return;
    }
  } catch (e) {}
  done(fallback);
}
