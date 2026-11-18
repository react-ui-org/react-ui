import os
import socket
import threading

# Loopback CDP proxy. Runs INSIDE the node container.
#
# A container reaches host Chrome only via `host.docker.internal` (forwarded to
# the host loopback on Docker Desktop; the bridge gateway on native Linux Docker,
# where a host-side ncat forwarder exposes Chrome's loopback CDP port). But
# Chrome's DevTools endpoint rejects any Host header that isn't an IP literal (or
# the name "localhost") -- anti DNS-rebinding -- so connecting by that *name*
# fails, and the IPv6 it may also resolve to is often not forwarded.
#
# So this proxy listens on 127.0.0.1:LISTEN_PORT and forwards raw bytes to host
# Chrome. Clients reach it as "127.0.0.1:LISTEN_PORT", so the Host header Chrome
# sees is an IP (accepted), and the webSocketDebuggerUrl it echoes back stays on
# 127.0.0.1 too, so the follow-up WebSocket also works.
#
# The proxy's own endpoint is fixed: it always listens on the container loopback
# and forwards to host Chrome over host.docker.internal. Only the upstream Chrome
# port is configurable, via CHROME_DEBUG_PORT (set in the repo's .env, which
# Compose passes into the container), so a single knob keeps both sides in sync.

LISTEN_HOST = "127.0.0.1"
LISTEN_PORT = 9334  # fixed; must match PROXY_PORT in mcp-launch.sh
TARGET_HOST = "host.docker.internal"  # fixed; how the container reaches the host
TARGET_PORT = int(os.environ.get("CHROME_DEBUG_PORT") or "9333")  # host Chrome CDP port


def resolve_target():
    # Force IPv4: host.docker.internal may also resolve to an IPv6 address that
    # Docker does not forward to the host.
    try:
        infos = socket.getaddrinfo(TARGET_HOST, TARGET_PORT, socket.AF_INET, socket.SOCK_STREAM)
        return infos[0][4]
    except Exception:
        # Docker Desktop's well-known host-gateway IPv4 as a last resort.
        return ("192.168.65.254", TARGET_PORT)


TARGET = resolve_target()


def pipe(source, destination):
    try:
        while True:
            data = source.recv(65536)
            if not data:
                break
            destination.sendall(data)
    except Exception:
        pass
    finally:
        for sock in (source, destination):
            try:
                sock.close()
            except Exception:
                pass


def handle(client):
    try:
        upstream = socket.create_connection(TARGET, timeout=10)
    except Exception:
        client.close()
        return
    threading.Thread(target=pipe, args=(client, upstream), daemon=True).start()
    threading.Thread(target=pipe, args=(upstream, client), daemon=True).start()


def main():
    srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    try:
        srv.bind((LISTEN_HOST, LISTEN_PORT))
    except OSError:
        # Another instance already owns the port; let it serve.
        raise SystemExit(0)
    srv.listen(128)
    print("chrome-host: proxy listening %s:%d -> %s:%d" % (LISTEN_HOST, LISTEN_PORT, TARGET[0], TARGET[1]), flush=True)
    while True:
        try:
            conn, _ = srv.accept()
        except Exception:
            continue
        handle(conn)


if __name__ == "__main__":
    main()
