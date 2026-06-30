# AI Integration

The `devcontainer` ships several AI coding assistants (see
[General Guidelines](./general-guidelines.md#what-the-devcontainer-contains)):

* **Claude Code**
* **GitHub Copilot CLI**
* **OpenCode**

Through [Model Context Protocol (MCP)][mcp] they can be extended with extra
capabilities.

## Host Chrome via MCP

Any MCP-capable assistant in the `devcontainer` can drive a Chrome browser
running on your **host** machine, using [`chrome-devtools-mcp`][chrome-devtools-mcp].
This is useful for verifying UI changes, taking screenshots, and interactively
debugging the running application in a real browser.

The wiring lives in the `scripts/mcps/chrome-host/` directory and works on
macOS and Linux.

### Setup

The `chrome-host` server is registered automatically and, on **Docker Desktop**,
the container reaches host Chrome out of the box. Extra steps apply only to
**native Docker Engine on Linux**, where `host.docker.internal` does not resolve
by default and the `node` service needs a host-gateway mapping.

#### Automatic setup

The host-gateway mapping is added automatically on native Docker Engine as part
of the project's [automatic setup](./general-guidelines.md#automatic-setup)
(`setup.sh` runs `scripts/mcps/chrome-host/mcp-setup.sh`).

#### Manual setup

To configure it by hand instead, add the host-gateway mapping to the `node`
service:

```yaml
services:
    node:
        extra_hosts:
            - "host.docker.internal:host-gateway"
```

#### Environment

Chrome binary, port, and bind address can be overridden via the repo's `.env`
(the host launcher reads it directly; the in-container proxy receives the port
through Docker Compose). See `.env.dist` for the available options.

### Usage

1. **Start the debug browser on the host.** Run this from a normal host terminal
   (not from inside the `devcontainer`):

    ```bash
    npm run start:chrome
    ```

   or if you do not have `npm` installed on the host:

    ```bash
    ./scripts/mcps/chrome-host/start-host-chrome.sh
    ```

   A dedicated browser window opens using a throwaway profile, so your everyday
   browser and its logins are untouched. The command is safe to re-run.

2. **Trust the project's MCP servers.** All three assistants are pre-configured
   in the repository. Each asks you once, on first run, to trust the project's
   MCP servers — approve it.

    * **Claude** and **GitHub Copilot CLI** read the project's `.mcp.json`.
    * **OpenCode** reads the project's `opencode.json`.

3. **Use it.** The assistant can now navigate, click, screenshot, and inspect
   the host browser window.

### Notes

* For how it works, platform specifics (Docker Desktop vs. native Docker on
  Linux), and configuration options, see
  `scripts/mcps/chrome-host/README.md`.

[mcp]: https://modelcontextprotocol.io/
[chrome-devtools-mcp]: https://github.com/ChromeDevTools/chrome-devtools-mcp
