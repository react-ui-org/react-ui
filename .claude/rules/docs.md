---
paths:
  - "src/docs/**"
  - "src/components/**/README.md"
  - "src/helpers/**/README.md"
  - "README.md"
---

# Documentation

## Commands

* Run `npm run markdownlint` after changes (add `-- --fix` to autofix).
* Run `mkdocs build` and `mkdocs serve` to build and serve the documentation
* To verify a rendered component or the docs previews in a real browser
  (navigate, click, screenshot, inspect the running docs site), drive host
  Chrome through the `chrome-host` MCP. See
  [AI Integration](../../src/docs/contribute/ai-integration.md).

See [Commands](../../CLAUDE.md#commands).

## Conventions

* Documentation is built with [Material for MkDocs][mkdocs-material] and
  [Docoff][docoff] (live, runnable component previews). Component docs live in
  each component's `README.md`; guides and foundations live under `src/docs/`.
* New pages must be wired into the navigation in [mkdocs.yml](../../mkdocs.yml).
* Use relative links between docs.
* Keep theming out of README prose: document it only in the `## Theming` section
  at the end of a component's `README.md`, including examples that override
  `--rui-*` custom properties. Other sections must not link to
  `/docs/customize/theming/*` or to `#theming` — downstream design systems drop
  the whole section when they sync our docs.

## Reference

* [General Guidelines › Documenting](../../src/docs/contribute/general-guidelines.md#documenting)

[mkdocs-material]: https://squidfunk.github.io/mkdocs-material/
[docoff]: https://github.com/react-ui-org/docoff
