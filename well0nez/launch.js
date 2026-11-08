/* The landing page: pick a payload, then start the run.
 *
 * Leaving this page has to be a real navigation from it -- the referrer guard
 * in jb.js arms the chain only when the run page was reached from here. */

var TARGET = {
  hen: "log=1&afterglow=run&payload=hen.bin",
  goldhen: "log=1&afterglow=run&mode=goldhen",
};

var AUTOSTART_SECONDS = 5;
var STORE_KEY = "afterglow.choice";

var form = document.getElementById("pick");
var autoBox = document.getElementById("auto");
var countEl = document.getElementById("count");
var cacheEl = document.getElementById("cache");
var ticker = null;
var waitingForCache = false;
var gone = false;

/* How long the start may wait for the cache before it goes anyway.
 *
 * With no route the manifest check does not fail fast -- it sits on a
 * network timeout, measured at 20-30 s on a console, and the page said
 * "waiting for the cache" the whole time. Offline use is a first-class
 * case here, not an edge case: the files are already on disk, and a run
 * from them is exactly as good. So the wait is a courtesy with an upper
 * bound, never a gate. */

/* The offline cache, and the one state that must not be run through.
 *
 * While the manifest is being checked or fetched, some modules are the ones
 * the page loaded with and some are not yet on disk -- starting there can mix
 * two builds. Every other state is fine to start from: IDLE is cached and
 * current, UNCACHED means no cache at all (which works as long as the server
 * answers), and a browser with no Application Cache at all -- every desktop
 * browser since Chrome 95 -- must obviously still be able to start.
 *
 * So this blocks on CHECKING and DOWNLOADING and nothing else. The inverse,
 * passing only on IDLE, leaves the button dead wherever the cache is absent.
 *
 * The idea is titotryh-ux's, from Fewi-PS4 911e08a. */
var appCache = (function () {
  try { return window.applicationCache || null; } catch (e) { return null; }
})();

function cacheBusy() {
  if (!appCache) return false;
  try {
    return appCache.status === appCache.CHECKING
        || appCache.status === appCache.DOWNLOADING;
  } catch (e) {
    return false;
  }
}

function cacheNote() {
  if (!cacheEl) return;
  if (!appCache) { cacheEl.textContent = ""; return; }
  var text = "";
  try {
    if (appCache.status === appCache.CHECKING) text = "checking for updates";
    else if (appCache.status === appCache.DOWNLOADING) text = "loading files - hold on";
    else if (appCache.status === appCache.UPDATEREADY) text = "a newer version is cached - reopen this page to use it";
    else if (appCache.status === appCache.OBSOLETE) text = "the cache was dropped - the server answers directly";
    /* Not a reason to refuse -- it works wherever the server answers. But it
       means the manifest was not accepted, and offline that is the state in
       which a fetch stalls instead of failing, so say it out loud. */
    else if (appCache.status === appCache.UNCACHED) text = "no offline cache - the manifest was not accepted";
  } catch (e) {}
  cacheEl.textContent = text;
}

function cacheChanged() {
  cacheNote();
  /* Someone pressed start while the files were still coming down. Go now
     that they are here, rather than making them press again. */
  if (waitingForCache && !cacheBusy()) {
    waitingForCache = false;
    start();
  }
}

if (appCache) {
  var events = ["checking", "downloading", "progress", "cached", "noupdate",
                "updateready", "error", "obsolete"];
  for (var e = 0; e < events.length; e++) {
    try { appCache.addEventListener(events[e], cacheChanged, false); } catch (err) {}
  }
}

/* The choice is remembered in localStorage, not by any HTTP cache: cache
   headers decide whether a file is fetched again, never what the page
   remembers. Both accessors are guarded, because storage can be unavailable
   or throw outright, and the page has to work either way. */
function remember() {
  try {
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({ payload: picked(), autostart: autoBox.checked }),
    );
  } catch (e) {}
}

function restore() {
  var saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
  } catch (e) {}
  if (!saved) return;

  if (saved.payload && TARGET[saved.payload]) {
    var radio = form.querySelector(
      'input[name="payload"][value="' + saved.payload + '"]',
    );
    if (radio) radio.checked = true;
  }
  if (typeof saved.autostart === "boolean") autoBox.checked = saved.autostart;
}

function picked() {
  var radio = form.querySelector('input[name="payload"]:checked');
  return radio ? radio.value : "goldhen";
}

function go() {
  if (gone) return;
  gone = true;
  location.href = "jb.html?" + TARGET[picked()];
}

function offline() {
  try { return navigator.onLine === false; } catch (e) { return false; }
}

function start() {
  stopClock();
  /* Not a refusal -- a wait that ends by itself. Starting while the manifest
     is being checked or fetched can mix two builds, so there is no deadline
     here that would run through that state: the cache events call back in
     and the run begins the moment the files are in. Offline it does not wait
     at all, because then there is nothing to wait for. */
  if (!offline() && cacheBusy()) {
    waitingForCache = true;
    countEl.textContent = "waiting for the cache";
    cacheNote();
    return;
  }
  go();
}

function stopClock() {
  if (ticker !== null) {
    clearInterval(ticker);
    ticker = null;
  }
  countEl.textContent = "";
}

function startClock() {
  var left = AUTOSTART_SECONDS;
  countEl.textContent = "starting in " + left + "s";
  ticker = setInterval(function () {
    /* Hold, do not overtake: while the cache is moving the clock stands
       still and picks up where it left off once the files are in. The old
       behaviour let it run out mid-download and started anyway. */
    if (!offline() && cacheBusy()) {
      countEl.textContent = "cache is loading - start held";
      cacheNote();
      return;
    }
    left -= 1;
    if (left <= 0) {
      start();
      return;
    }
    countEl.textContent = "starting in " + left + "s";
  }, 1000);
}

form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  start();
});

form.addEventListener("change", function (ev) {
  remember();
  if (ev.target === autoBox) {
    if (autoBox.checked) startClock();
    else stopClock();
    return;
  }
  /* Switching payload while the clock runs restarts it, so what is counting
     down is always what is actually selected. */
  if (ev.target.name === "payload" && autoBox.checked) {
    stopClock();
    startClock();
  }
});

restore();
cacheNote();
if (autoBox.checked) startClock();
