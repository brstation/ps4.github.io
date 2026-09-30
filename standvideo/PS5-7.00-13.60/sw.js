const CACHE_NAME = "stand-ps5-v1";

const FILES = [
    "./",
    "./index.html",
    "./img/BG.jpg",

    "./offsets/7.00.js",
    "./offsets/7.01.js",
    "./offsets/7.20.js",
    "./offsets/7.40.js",
    "./offsets/7.60.js",
    "./offsets/7.61.js",
    "./offsets/8.00.js",
    "./offsets/8.20.js",
    "./offsets/8.40.js",
    "./offsets/8.60.js",
    "./offsets/9.00.js",
    "./offsets/9.20.js",
    "./offsets/9.40.js",
    "./offsets/9.60.js",

    "./offsets/10.00.js",
    "./offsets/10.01.js",
    "./offsets/10.20.js",
    "./offsets/10.40.js",
    "./offsets/10.60.js",
    "./offsets/11.00.js",
    "./offsets/11.20.js",
    "./offsets/11.60.js",
    "./offsets/12.00.js",
    "./offsets/12.02.js",
    "./offsets/12.20.js",
    "./offsets/12.40.js",
    "./offsets/12.60.js",
    "./offsets/12.70.js",
    "./offsets/13.00.js",
    "./offsets/13.20.js",
    "./offsets/13.40.js",
    "./offsets/13.42.js",
    "./offsets/13.60.js",

    "./payloads/elfldr-ps5-1360.elf",
    "./payloads/etaHEN.elf",
    "./payloads/kexp_2026_05_25.bin",
    "./payloads/kstuff.elf",
    "./payloads/shadowmountplus.elf",

    "./src/firmware.js",
    "./src/kexp.js",
    "./src/main.js",
    "./src/relapse_exploit.js",
    "./src/rop.js",
    "./src/site.js",
    "./src/utils/int64.js",
    "./src/utils/mem.js",
    "./src/utils/rop_slave.js",
    "./src/utils/syscalls.js",
    "./src/webkit.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES);
        })
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );

    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            return cached || fetch(event.request);
        })
    );
});