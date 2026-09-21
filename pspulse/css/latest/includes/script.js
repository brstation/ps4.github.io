let timerId = null; 
const label = document.getElementById('autoJbLabel');
const checkbox = document.getElementById('autoJbInput');
const jeilbrekBtn = document.getElementById('jeilbrek');
const UAElement = document.getElementById("UA");

const storedAutoJb = localStorage.getItem("autoJb");
// Автозапуск включён по умолчанию: хост сам начинает активацию GoldHEN
// через 5 секунд после загрузки. Выключение сохраняется в localStorage.
let autoJbValue = storedAutoJb !== null ? storedAutoJb === "true" : true;

// choose one of kernel exploits
var exploitChain = localStorage.getItem("exploitChain") || "lapse";
const netctrlRadio = document.getElementById("netctrl-exploit");
const lapseRadio = document.getElementById("lapse-exploit");
const kexForm = document.getElementById('kernel-options');

// Show user agent
UAElement.innerText += " " + navigator.userAgent;

kexForm.addEventListener("change", function (event) {
    localStorage.setItem("exploitChain", event.target.value);
    exploitChain = event.target.value;
});

// jailbreak execution
jeilbrekBtn.addEventListener("click", function (e){
    jeilbrekBtn.disabled = true;
    stopInterval();
    doJb();
});

// upstream: guarded reload button for recovering after a failed attempt
const reloadBtn = document.getElementById('reloadBtn');

if (reloadBtn) {
    reloadBtn.addEventListener("click", function () {
        stopInterval();
        window.location.reload();
    });
}

checkbox.addEventListener('change', function () {
    localStorage.setItem("autoJb", checkbox.checked);
    if (checkbox.checked == true && jeilbrekBtn.disabled == false) {
        startAutoJb();
        return;
    }

    stopInterval();
});

function stopInterval(){
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
    label.textContent = "Auto Jailbreak";
}

// Гигиена лога консоли: за один прогон exploit пишет сотни отладочных строк,
// DOM #console растёт без ограничений. Держим последние строки, старые
// удаляем пачками. На логику чейна не влияет — только рендер; сам логгер
// в src/misc.js upstream-синхронен и не тронут.
var CONSOLE_KEEP_LINES = 400;
setInterval(function () {
    var c = document.getElementById('console');
    if (!c) return;
    while (c.childNodes.length > CONSOLE_KEEP_LINES + 100) {
        c.removeChild(c.firstChild);
    }
}, 5000);

function jailbreakCountdown() {   
    stopInterval();

    let countdown = 5;
    label.textContent = `Auto Jailbreaking in: ${countdown}`;
    timerId = setInterval(() => {
        countdown--;
        label.textContent = `Auto Jailbreaking in: ${countdown}`;

        if (countdown < 0) {
            jeilbrekBtn.disabled = true; 
            clearInterval(timerId);
            timerId = null;
            label.textContent = 'Executing';
            doJb();
        }
    }, 1000);
}

// Точка входа автозапуска: отсчёт стартует только на устоявшемся кэше.
// Иначе тяжёлый exploit-чейн идёт поверх фоновой закачки и вешает браузер
// (прогресс вставал ~81%). Покрыты все состояния AppCache:
// - CHECKING/DOWNLOADING: закачка идёт — ждём терминального события;
// - UNCACHED с манифестом: первый визит, проверка манифеста обычно ещё не
//   стартовала — ждём её начала + терминального события, со страховкой
//   таймаутом на случай, если AppCache для страницы не работает (file://);
// - IDLE и прочие: кэш готов — отсчёт сразу, но с ловушкой на позднюю
//   закачку (проверка обновлений может стартовать уже после загрузки).
function startAutoJb() {
    if (jeilbrekBtn.disabled) return;
    var ac = window.applicationCache;
    var hasManifest = false;
    try { hasManifest = document.documentElement.hasAttribute("manifest"); } catch (e) { hasManifest = false; }
    if (!ac || !hasManifest) { jailbreakCountdown(); return; }

    var waitDone = false;
    var uncachedFallback = null;
    var userTookOver = function () {
        return jeilbrekBtn.disabled || !checkbox.checked;
    };
    var detachWaiters = function () {
        ac.removeEventListener('downloading', onLateDownload, false);
        ac.removeEventListener('cached', onCacheReady, false);
        ac.removeEventListener('updateready', onCacheReady, false);
        ac.removeEventListener('noupdate', onCacheReady, false);
        ac.removeEventListener('error', onCacheError, false);
    };
    var onCacheReady = function () {
        if (waitDone) return;
        waitDone = true;
        detachWaiters();
        clearTimeout(uncachedFallback);
        if (!userTookOver()) jailbreakCountdown();
    };
    var onCacheError = function () {
        if (waitDone) return;
        waitDone = true;
        detachWaiters();
        clearTimeout(uncachedFallback);
        label.textContent = 'Cache error - press Jailbreak manually';
    };
    // Поздняя закачка при устоявшемся кэше: остановить бегущий отсчёт
    // и дождаться терминального события вместо гонки с чейном.
    var onLateDownload = function () {
        ac.removeEventListener('downloading', onLateDownload, false);
        if (waitDone || userTookOver()) return;
        stopInterval();
        label.textContent = 'Cache update found... auto-start paused';
        ac.addEventListener('cached', onCacheReady, false);
        ac.addEventListener('updateready', onCacheReady, false);
        ac.addEventListener('noupdate', onCacheReady, false);
        ac.addEventListener('error', onCacheError, false);
    };
    var st = ac.status;
    if (st === ac.CHECKING || st === ac.DOWNLOADING || st === ac.UNCACHED) {
        label.textContent = (st === ac.UNCACHED)
            ? 'Checking offline cache...'
            : 'Installing offline cache... auto-start paused';
        ac.addEventListener('cached', onCacheReady, false);
        ac.addEventListener('updateready', onCacheReady, false);
        ac.addEventListener('noupdate', onCacheReady, false);
        ac.addEventListener('error', onCacheError, false);
        if (st === ac.UNCACHED) {
            uncachedFallback = setTimeout(function () {
                if (waitDone) return;
                try {
                    // Закачка всё-таки стартовала позже — её терминальные
                    // события уже под контролем слушателей выше.
                    if (ac.status !== ac.UNCACHED) return;
                } catch (e) {}
                waitDone = true;
                detachWaiters();
                if (!userTookOver()) jailbreakCountdown();
            }, 8000);
        }
        return;
    }
    ac.addEventListener('downloading', onLateDownload, false);
    jailbreakCountdown();
}

function cacheProgress(e) {
    var Percent = (Math.round(e.loaded / e.total * 100));
    document.title = "Caching: " + Percent + "%";
}

function displayCacheProgress() {
    setTimeout(function () {
        // show a tick
        document.title = "\u2713";
    }, 1000);
    setTimeout(function () {
        // location.reload();
        document.title = "CSSFontFace exploit";
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function() {
    // Cache handling
    if (window.applicationCache) {
        window.applicationCache.addEventListener("progress", cacheProgress, false);
        window.applicationCache.oncached = function (e) { displayCacheProgress(); };
        window.applicationCache.onupdateready = function (e) { displayCacheProgress(); };
    }

    // choose prefered exploit chain
    if (exploitChain == "netctrl") {
        netctrlRadio.checked = true;
    } else {
        lapseRadio.checked = true;
    }

    // apply autojb localStorage value
    checkbox.checked = autoJbValue;

    // Автозапуск ждёт завершения установки AppCache: запуск тяжёлого
    // exploit-чейна (heap-spray, воркеры, kernel race) поверх фоновой
    // загрузки кэша вешает PS4-браузер — прогресс останавливается (~81%,
    // крупные файлы payload.bin и kernel-цепочки идут в конце очереди).
    if (autoJbValue) startAutoJb();
});
