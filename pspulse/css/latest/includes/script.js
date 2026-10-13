(function () {
    var timerId = null;
    var cacheWaitActive = false;
    var jailbreakRunning = false;
    var label = document.getElementById('autoJbLabel');
    var checkbox = document.getElementById('autoJbInput');
    var jailbreakButton = document.getElementById('jeilbrek');
    var reloadButton = document.getElementById('reloadBtn');
    var uaElement = document.getElementById('UA');
    var output = document.getElementById('console');
    var netctrlRadio = document.getElementById('netctrl-exploit');
    var lapseRadio = document.getElementById('lapse-exploit');
    var form = document.getElementById('kernel-options');
    var preflightKey = 'cssPreflightReady:' + window.location.pathname;

    function storageGet(name, fallback) {
        try {
            var value = localStorage.getItem(name);
            return value === null ? fallback : value;
        } catch (error) {
            return fallback;
        }
    }

    function storageSet(name, value) {
        try {
            localStorage.setItem(name, String(value));
        } catch (error) {}
    }

    function sessionGet(name) {
        try {
            return sessionStorage.getItem(name);
        } catch (error) {
            return null;
        }
    }

    function sessionSet(name, value) {
        try {
            sessionStorage.setItem(name, String(value));
        } catch (error) {}
    }

    function sessionRemove(name) {
        try {
            sessionStorage.removeItem(name);
        } catch (error) {}
    }

    var storedChain = storageGet('exploitChain', 'lapse');
    window.exploitChain =
        storedChain === 'netctrl' ? 'netctrl' : 'lapse';
    var autoJbValue = storageGet('autoJb', 'true') === 'true';

    function detectSupportedPS4() {
        var ua = navigator.userAgent;
        if (!/PlayStation 4/i.test(ua) ||
            /PlayStation 5/i.test(ua)) {
            return false;
        }

        var match = ua.match(
            /PlayStation\s+4[\/ ](\d+)\.(\d+)/
        );
        if (!match) return false;

        var major = parseInt(match[1], 10);
        var minor = parseInt(match[2], 10);
        return major >= 6 &&
            (major < 11 || (major === 11 && minor <= 2));
    }

    function appendOutput(message) {
        if (!output) return;
        output.textContent += '\n' + message;
        output.scrollTop = output.scrollHeight;
    }

    function stopCountdown() {
        if (timerId !== null) {
            clearInterval(timerId);
            timerId = null;
        }
        if (!jailbreakRunning) {
            label.textContent = 'Auto Jailbreak';
        }
    }

    function runJailbreak() {
        if (jailbreakRunning) return;
        jailbreakRunning = true;
        stopCountdown();
        jailbreakButton.disabled = true;
        label.textContent = 'Executing';

        Promise.resolve()
            .then(function () {
                return doJb();
            })
            .then(function () {
                label.textContent = 'Completed';
            })
            .catch(function (error) {
                var message = error && error.message ?
                    error.message : String(error);
                appendOutput('[-] ' + message);
                label.textContent =
                    'Failed — reload before retrying';
            });
    }

    function jailbreakCountdown() {
        stopCountdown();
        var countdown = 5;
        label.textContent =
            'Auto Jailbreaking in: ' + countdown;

        timerId = setInterval(function () {
            countdown -= 1;
            label.textContent =
                'Auto Jailbreaking in: ' + countdown;

            if (countdown <= 0) {
                clearInterval(timerId);
                timerId = null;
                runJailbreak();
            }
        }, 1000);
    }

    function startAutoJb() {
        if (cacheWaitActive || jailbreakRunning ||
            jailbreakButton.disabled || !checkbox.checked) {
            return;
        }

        var cache = window.applicationCache;
        var hasManifest =
            document.documentElement.hasAttribute('manifest');
        if (!cache || !hasManifest) {
            jailbreakCountdown();
            return;
        }

        cacheWaitActive = true;
        var finished = false;
        var watchdog = null;

        function detach() {
            if (watchdog !== null) clearTimeout(watchdog);
            cache.removeEventListener(
                'downloading', onDownloading, false
            );
            cache.removeEventListener(
                'cached', onCached, false
            );
            cache.removeEventListener(
                'noupdate', onReady, false
            );
            cache.removeEventListener(
                'updateready', onUpdate, false
            );
            cache.removeEventListener(
                'error', onError, false
            );
        }

        function finish() {
            if (finished) return;
            finished = true;
            cacheWaitActive = false;
            detach();
        }

        function onDownloading() {
            stopCountdown();
            label.textContent =
                'Installing offline cache...';
        }

        function startAfterSettledCache() {
            sessionRemove('cssCleanCacheReload');
            if (!checkbox.checked || jailbreakRunning) return;

            if (sessionGet(preflightKey) !== 'yes') {
                sessionSet(preflightKey, 'yes');
                label.textContent =
                    'Preparing a clean memory state — reloading once...';
                setTimeout(function () {
                    window.location.reload();
                }, 750);
                return;
            }

            jailbreakCountdown();
        }

        function onReady() {
            finish();
            startAfterSettledCache();
        }

        function reloadForCleanStart(message, swapCache) {
            finish();
            if (swapCache) {
                try {
                    cache.swapCache();
                } catch (error) {}
            }

            if (sessionGet('cssCleanCacheReload') === 'yes') {
                startAfterSettledCache();
                return;
            }

            sessionSet('cssCleanCacheReload', 'yes');
            sessionSet(preflightKey, 'yes');
            label.textContent = message;
            setTimeout(function () {
                window.location.reload();
            }, 750);
        }

        function onCached() {
            reloadForCleanStart(
                'Cache installed — reloading for a clean start...',
                false
            );
        }

        function onUpdate() {
            reloadForCleanStart(
                'Cache updated — reloading for a clean start...',
                true
            );
        }

        function onError() {
            finish();
            stopCountdown();
            sessionRemove('cssCleanCacheReload');
            label.textContent =
                'Cache failed — retry manually';
        }

        cache.addEventListener(
            'downloading', onDownloading, false
        );
        cache.addEventListener('cached', onCached, false);
        cache.addEventListener('noupdate', onReady, false);
        cache.addEventListener(
            'updateready', onUpdate, false
        );
        cache.addEventListener('error', onError, false);

        if (cache.status === cache.UPDATEREADY) {
            onUpdate();
        } else if (cache.status === cache.CHECKING ||
                   cache.status === cache.DOWNLOADING ||
                   cache.status === cache.UNCACHED) {
            label.textContent =
                'Waiting for offline cache...';
            watchdog = setTimeout(onError, 60000);
        } else {
            cacheWaitActive = false;
            startAfterSettledCache();
        }
    }

    if (uaElement) {
        uaElement.textContent =
            'Running on: ' + navigator.userAgent;
    }

    if (!detectSupportedPS4()) {
        checkbox.checked = false;
        checkbox.disabled = true;
        jailbreakButton.disabled = true;
        label.textContent =
            'Unsupported device or firmware';
        appendOutput(
            '[-] This host supports PS4 firmware 6.00-11.02 only.'
        );
        return;
    }

    if (window.exploitChain === 'netctrl') {
        netctrlRadio.checked = true;
    } else {
        lapseRadio.checked = true;
    }
    checkbox.checked = autoJbValue;

    form.addEventListener('change', function (event) {
        if (event.target &&
            (event.target.value === 'lapse' ||
             event.target.value === 'netctrl')) {
            window.exploitChain = event.target.value;
            storageSet('exploitChain', window.exploitChain);
        }
    });

    jailbreakButton.addEventListener('click', function () {
        runJailbreak();
    });

    reloadButton.addEventListener('click', function () {
        stopCountdown();
        window.location.reload();
    });

    checkbox.addEventListener('change', function () {
        storageSet('autoJb', checkbox.checked);
        if (checkbox.checked) {
            startAutoJb();
        } else {
            stopCountdown();
        }
    });

    if (autoJbValue) startAutoJb();
}());