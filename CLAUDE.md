# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository

## Environment

This project is developed inside a Docker container called `devcontainer`.
The commands below assume you are running inside the `devcontainer`.

From the host, run them inside it with
`docker compose exec -T devcontainer <command>` (start it first with
`docker compose up -d`). The other service containers (`node`, `playwright`,
`docs`) are implementation details — do not call them directly.

If file `/.dockerenv` is present, you are in a Docker container.

For details, see the
[Contributing Guide](src/docs/contribute/general-guidelines.md#development-environment).

## Commands

Run these inside the `devcontainer` (from the host, prefix with
`docker compose exec -T devcontainer`). For details, see the
[Contributing Guide](src/docs/contribute/general-guidelines.md).

| Task                              | Command                                                             |
|-----------------------------------|---------------------------------------------------------------------|
| Install JS                        | `npm ci`                                                            |
| Build library                     | `npm run build`                                                     |
| Build type declarations only      | `npm run build:types`                                               |
| Run static checks                 | `npm run lint`                                                      |
| Run type check                    | `npm run typecheck`                                                 |
| Run unit tests                    | `npm run test:jest`                                                 |
| Run a single unit test file       | `npm run test:jest -- <file>`                                       |
| Run component tests               | `npm run test:playwright-ct:all`                                    |
| Component tests for one component | `npm run test:playwright-ct:all -- -- src/components/Button`        |
| Update component snapshots        | `npm run test:playwright-ct:all-with-update`                        |
| Start build watcher               | `npm start`                                                         |
| Build documentation               | `mkdocs build`                                                      |
| Serve documentation               | `mkdocs serve`                                                      |

Notes:

* Commands like `npm`, `playwright` run in specific Docker containers.
  Normally, when you run those commands, they are executed within dedicated
  containers. If you need to communicate directly with specific Docker container,
  use `sudo docker compose ...`. It can be useful when stopping server that is
  running within `node` container even though it is started from `devcontainer`.
* See the `scripts` section in `package.json` for the full list of commands.

## Topics (Claude Rules)

Project rules live in [.claude/rules/](.claude/rules/). There are two kinds.

**Always-on** (no frontmatter) — apply to every change:

* [code.md](.claude/rules/code.md) — scope discipline, minimal changes.
* [git.md](.claude/rules/git.md) — branches, commits, PRs.
* [safety-guards.md](.claude/rules/safety-guards.md) — hard guard rails.

**Path-scoped** — each carries a `paths:` glob declaring the files it governs;
consult it when touching those files:

* [frontend.md](.claude/rules/frontend.md) — `src/**/*.ts`, `src/**/*.tsx`:
  stack, component structure, implementation pattern.
* [styling.md](.claude/rules/styling.md) — `src/**/*.scss`, `src/**/*.css`:
  CSS Modules, class naming, theming.
* [testing.md](.claude/rules/testing.md) — `*.spec.tsx`, `*.story.tsx`,
  `__tests__/**`, `tests/**`: Jest and table-driven Playwright tests.
* [docs.md](.claude/rules/docs.md) — `src/docs/**`, component `README.md`.

## Agents (Claude Agents)

Specialized agents live in [.claude/agents/](.claude/agents/).

* `code-reviewer` — review a change against this repo's rules (uncommitted work,
  or a whole branch vs its base).

## AI Integration

MCP-capable assistants in the `devcontainer` can drive host Chrome to verify the
docs site and rendered components. See
[AI Integration](src/docs/contribute/ai-integration.md) and
[scripts/mcps/chrome-host/README.md](scripts/mcps/chrome-host/README.md).
