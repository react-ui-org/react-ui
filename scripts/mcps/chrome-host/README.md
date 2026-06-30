# Chrome-host bridge

Lets an MCP-capable AI assistant in the `devcontainer` drive **Chrome on the
host** via [`chrome-devtools-mcp`](https://github.com/ChromeDevTools/chrome-devtools-mcp)
over the Chrome DevTools Protocol (CDP).

## Principles

- The container reaches the host only via `host.docker.internal`.
- Chrome's DevTools endpoint rejects any `Host` header that is not an IP literal
  (or the name `localhost`) — so the container cannot connect to it directly.
- Fix: a loopback proxy **inside the container** (`127.0.0.1:9334`); the `Host`
  Chrome finally sees is `127.0.0.1`, an IP, which it accepts.
- Chrome runs in a dedicated, persistent profile (separate from your everyday
  one) and is started **by hand** on the host — never from a Claude action,
  which can reap it with its process group.

## Architecture

```text
Claude (devcontainer)
  │ .mcp.json → mcp-entry.sh → docker compose exec node mcp-launch.sh
  ▼
node container
  ├─ cdp_proxy.py   127.0.0.1:9334 ──► host.docker.internal:9333
  └─ npx chrome-devtools-mcp --browser-url http://127.0.0.1:9334
                                          │
                                          ▼
host: Chrome --remote-debugging-port=9333 (throwaway profile)
```

| Script | Runs on | Purpose |
| --- | --- | --- |
| `start-host-chrome.sh` | host | Launch the debug Chrome on `:9333`. Idempotent; auto-detects Chrome/Chromium/Edge. On native Docker, also runs an `ncat` forwarder to expose `:9333` on the bridge gateway. |
| `cdp_proxy.py` | node container | Loopback CDP proxy `:9334` → host `:9333`. Binds-or-exits. |
| `mcp-launch.sh` | node container | Ensure the proxy is up, then `exec` `chrome-devtools-mcp`. |
| `mcp-entry.sh` | host / devcontainer | The `.mcp.json` command; routes into the node container (adds `sudo` inside the container). |
| `mcp-setup.sh` | host (setup) | Add the `host.docker.internal:host-gateway` mapping on native Docker Engine. Idempotent; no-op on Docker Desktop. |

## Registration

Register `mcp-entry.sh` as an MCP server named `chrome-host`. Any MCP client
works — point its config at the script.

**Claude / GitHub Copilot CLI** — `.mcp.json` (repo root):

```json
{
  "mcpServers": {
    "chrome-host": {
      "command": "sh",
      "args": ["scripts/mcps/chrome-host/mcp-entry.sh"]
    }
  }
}
```

**OpenCode** — `opencode.json` (repo root):

```json
{
  "mcp": {
    "chrome-host": {
      "type": "local",
      "command": ["sh", "scripts/mcps/chrome-host/mcp-entry.sh"],
      "enabled": true
    }
  }
}
```

Requirements: a `docker-compose.yml` at the repo root, the repo mounted at
`/workspace` in the container, and a Compose service named `node` that runs
`node`/`npx`.

## Usage

1. Start host Chrome (from a host terminal, **not** from inside an AI action):

   ```sh
   ./scripts/mcps/chrome-host/start-host-chrome.sh
   ```

2. On first run, approve the `chrome-host` server in your MCP client.

The proxy and MCP server are bootstrapped by `mcp-launch.sh`; you only start
Chrome by hand.

## Platform support

Decided by **Docker Desktop vs native Docker Engine**, not the OS.

| Host setup | `host.docker.internal` reaches host loopback? | Extra steps |
| --- | --- | --- |
| Docker Desktop (macOS/Linux) | Yes (auto) | None. |
| Native Docker Engine (Linux) | No (bridge gateway only) | `setup.sh` (via `mcp-setup.sh`) adds the host-gateway mapping; the launcher runs a host-side `ncat` forwarder (install `nmap-ncat`/`nmap`) to expose Chrome's loopback CDP port on the bridge gateway. **Firewall the port**: this exposes DevTools beyond loopback. |

## Configuration

- Ports: host CDP `9333` (configurable), in-container proxy `9334` (fixed).
- Overrides (host launcher), set in the repo `.env`: `CHROME_DEBUG_PORT` and
  `CHROME_BIN`. `CHROME_DEBUG_BIND` is an advanced escape hatch — the bind is
  auto-detected, so it is not listed in `.env.dist`; set it only when detection
  fails (e.g. a non-default daemon `host-gateway-ip`). **Security:** a
  non-loopback bind exposes the unauthenticated CDP port; firewall it.
  The proxy's listen port and target host are fixed constants; only its upstream
  port is configurable, and it follows the same `CHROME_DEBUG_PORT`.
- Set these in the repo `.env`; Compose passes `CHROME_DEBUG_PORT` into the
  container, so a single knob drives both sides. Recreate the node container
  after editing. See `.env.dist`.
- Profile: `~/.chrome-debug-profile-<COMPOSE_PROJECT_NAME>` (per project, fixed).

## Troubleshooting

- Status: `claude mcp get chrome-host` (`✔ Connected` = healthy chain).
- Chrome died? Re-run `start-host-chrome.sh` (it persists across sessions).
- `claude mcp list` shows *Pending approval* until you approve project servers.
- Disable: remove the `chrome-host` entry from `.mcp.json`.
