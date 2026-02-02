import http.server
import socketserver
from pathlib import Path


ROOT = Path(__file__).parent / "static"
PORT = 8001


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)


def run():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving on http://localhost:{PORT}")
        httpd.serve_forever()


if __name__ == "__main__":
    run()
