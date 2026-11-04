#!/bin/sh
# Serve this folder to the console.
#
#   ./serve.sh                     # port 8000
#   AFTERGLOW_PORT=8080 ./serve.sh
#
# Two things this has to get right, and a plain `python3 -m http.server`
# gets one of them wrong:
#
#   * no-store on code. The console's browser holds on to modules, and a
#     corrected file would otherwise never arrive. That matters most for the
#     payloads: a cached .bin would keep running after you swapped it, and an
#     unpatched ps4-hen freezes the console. Images are cached, since a stale
#     picture harms nobody.
#   * text/javascript for .js, so the ES modules load as modules.
#
# Settings the pages remember (the payload choice, autostart) live in the
# browser's localStorage and are unaffected by any of this.
#
# Nothing else. There is no command channel and no auto-run endpoint: the
# pages are plain static files, and the run starts from a link on index.html.

set -eu

cd "$(dirname "$0")"
PORT="${AFTERGLOW_PORT:-8000}"

exec python3 - "$PORT" <<'PY'
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".js": "text/javascript",
        ".css": "text/css",
        ".bin": "application/octet-stream",
    }

    CACHEABLE = (".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico")

    def end_headers(self):
        if self.path.split("?")[0].lower().endswith(self.CACHEABLE):
            self.send_header("Cache-Control", "public, max-age=604800")
        else:
            self.send_header("Cache-Control", "no-store, must-revalidate")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("%s %s\n" % (self.address_string(), fmt % args))


port = int(sys.argv[1])
server = ThreadingHTTPServer(("0.0.0.0", port), partial(Handler, directory="."))
print("afterglow on http://0.0.0.0:%d/  (ctrl-c to stop)" % port, flush=True)
try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
PY
