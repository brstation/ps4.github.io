// Payload delivery helpers for the PSPulse 9.xx host.
// Keep this file ES5-compatible for the PS4 browser.

var LoadedMSG = "Payload Loaded!";
var payloadRequestInFlight = false;

function xhrSucceeded(req) {
    return req.status === 200 || req.status === 304 || (req.status === 0 && req.response);
}

function getPayload(payload, onLoadEndCallback) {
    var req = new XMLHttpRequest();
    req.open('GET', payload, true);
    req.responseType = 'arraybuffer';
    req.timeout = 15000;
    req.onload = function (event) {
        if (onLoadEndCallback) onLoadEndCallback(req, event);
    };
    req.onerror = function (event) {
        if (onLoadEndCallback) onLoadEndCallback(req, event);
    };
    req.ontimeout = req.onerror;
    req.send();
}

function sendPayload(url, data, onLoadEndCallback) {
    var req = new XMLHttpRequest();
    req.open('POST', url, true);
    req.timeout = 15000;
    req.onload = function (event) {
        if (onLoadEndCallback) onLoadEndCallback(req, event);
    };
    req.onerror = function (event) {
        if (onLoadEndCallback) onLoadEndCallback(req, event);
    };
    req.ontimeout = req.onerror;
    req.send(data);
}

function setPayloadStatus(message) {
    var status = document.getElementById('msgs2');
    if (status) status.innerHTML = message;
}

function finishPayloadRequest() {
    payloadRequestInFlight = false;
}

function Loadpayloadonline(PLfile) {
    window.payload_path = PLfile;
    if (typeof window.toogle_payload === 'function') {
        window.toogle_payload(PLfile);
    } else {
        setPayloadStatus('Run the jailbreak first, then select this payload again.');
    }
}

function fallbackToExploitLoader(PLfile) {
    finishPayloadRequest();
    Loadpayloadonline(PLfile);
}

function Loadpayloadlocal(PLfile) {
    if (payloadRequestInFlight) {
        alert('Another payload request is already in progress.');
        return;
    }

    payloadRequestInFlight = true;
    setPayloadStatus('Checking GoldHEN BinLoader...');

    var statusReq = new XMLHttpRequest();
    statusReq.open('GET', 'http://127.0.0.1:9090/status', true);
    statusReq.timeout = 1800;
    statusReq.onload = function () {
        var responseJson;
        try {
            responseJson = JSON.parse(statusReq.responseText || '{}');
        } catch (e) {
            fallbackToExploitLoader(PLfile);
            return;
        }

        if (!xhrSucceeded(statusReq) || responseJson.status !== 'ready') {
            if (responseJson.status === 'busy') {
                finishPayloadRequest();
                alert('Cannot load the payload because the BinLoader server is busy.');
            } else {
                fallbackToExploitLoader(PLfile);
            }
            return;
        }

        setPayloadStatus('Loading payload file...');
        getPayload(PLfile, function (payloadReq) {
            if (!xhrSucceeded(payloadReq) || !payloadReq.response) {
                fallbackToExploitLoader(PLfile);
                return;
            }

            setPayloadStatus('Sending payload to GoldHEN...');
            sendPayload('http://127.0.0.1:9090', payloadReq.response, function (sendReq) {
                finishPayloadRequest();
                if (xhrSucceeded(sendReq)) {
                    if (typeof window.awaitpl === 'function') window.awaitpl();
                } else {
                    setPayloadStatus('Payload send failed. Please retry.');
                }
            });
        });
    };
    statusReq.onerror = function () { fallbackToExploitLoader(PLfile); };
    statusReq.ontimeout = statusReq.onerror;
    statusReq.send();
}

function loadPayloadWithConfirmation(file, label, question) {
    if (!confirm(question)) return;
    LoadedMSG = label + ' Payload Loaded!';
    Loadpayloadlocal(file);
}

function load_PSFreeFix() {
    loadPayloadWithConfirmation('./payloads/ps4-psfree-fix.bin', 'PSFree Fix', 'Are you sure you want to load the PSFree Fix payload?');
}
function load_app2usb() {
    loadPayloadWithConfirmation('./payloads/app2usb.bin', 'App2USB', 'Load App2USB payload? This allows transferring applications to USB storage.');
}
function load_appcache_install() {
    loadPayloadWithConfirmation('./payloads/appcache-install.bin', 'AppCache Install', 'Load AppCache Install payload?');
}
function load_backup() {
    loadPayloadWithConfirmation('./payloads/backup.bin', 'Backup', 'Load Backup payload? This will back up your system data.');
}
function load_disable_updates() {
    loadPayloadWithConfirmation('./payloads/disable-updates.bin', 'Disable Updates', 'Load Disable Updates payload? This will block system updates.');
}
function load_enable_updates() {
    loadPayloadWithConfirmation('./payloads/enable-updates.bin', 'Enable Updates', 'Load Enable Updates payload? This will allow system updates.');
}
function load_ftp() {
    loadPayloadWithConfirmation('./payloads/ftp.bin', 'FTP Server', 'Load FTP Server payload? This will start an FTP server on your PS4.');
}
function load_history_blocker() {
    loadPayloadWithConfirmation('./payloads/history-blocker.bin', 'History Blocker', 'Load History Blocker payload? This will block browser history tracking.');
}
function load_ps4debug() {
    loadPayloadWithConfirmation('./payloads/ps4debug.bin', 'PS4Debug', 'Load PS4Debug payload? This enables debugging features.');
}
function load_pup_decrypt() {
    loadPayloadWithConfirmation('./payloads/pup-decrypt.bin', 'PUP Decrypt', 'Load PUP Decrypt payload? This allows decrypting PS4 update files.');
}
function load_restore() {
    loadPayloadWithConfirmation('./payloads/restore.bin', 'Restore', 'Load Restore payload? This will restore your system data.');
}
function load_rif_renamer() {
    loadPayloadWithConfirmation('./payloads/rif-renamer.bin', 'RIF Renamer', 'Load RIF Renamer payload? This tool manages license files.');
}
function load_webrte() {
    loadPayloadWithConfirmation('./payloads/WebRTE_900.bin', 'WebRTE', 'Load WebRTE payload? This enables real-time editing features.');
}

window.getPayload = getPayload;
window.sendPayload = sendPayload;
window.Loadpayloadlocal = Loadpayloadlocal;
window.Loadpayloadonline = Loadpayloadonline;
window.load_PSFreeFix = load_PSFreeFix;
window.load_app2usb = load_app2usb;
window.load_appcache_install = load_appcache_install;
window.load_backup = load_backup;
window.load_disable_updates = load_disable_updates;
window.load_enable_updates = load_enable_updates;
window.load_ftp = load_ftp;
window.load_history_blocker = load_history_blocker;
window.load_ps4debug = load_ps4debug;
window.load_pup_decrypt = load_pup_decrypt;
window.load_restore = load_restore;
window.load_rif_renamer = load_rif_renamer;
window.load_webrte = load_webrte;
