---
paths:
  - "src/**/*.js"
  - "src/**/*.jsx"
---

# Frontend (React component library)

## Commands

* If dependencies change, run `npm ci`.
* Run `npm run eslint` after changes (add `-- --fix` to autofix).
* To verify a rendered component or the docs previews in a real browser
  (navigate, click, screenshot, inspect the running docs site), drive host
  Chrome through the `chrome-host` MCP. See
  [AI Integration](../../src/docs/contribute/ai-integration.md).

## Stack

React UI is a themeable React component library, distributed as a UMD bundle
(with separate CSS) and as ESM (consumers run their own SASS pipeline).
Components are plain JavaScript / JSX (Babel, no TypeScript in the source) for
React 18, validated with `prop-types`. TypeScript appears only in tests and type
checks.

## Component structure

Each component lives in `src/components/<ComponentName>/` and follows this
layout:

```text
Button/
  Button.jsx              # Component implementation (React.forwardRef + withGlobalProps)
  Button.module.scss      # CSS Modules styles
  index.js                # Re-exports default (withGlobalProps-wrapped) as named export
  _settings.scss          # Component-level SCSS variables
  _theme.scss             # CSS custom properties (design tokens)
  _tools.scss             # SCSS mixins
  README.md               # Docoff/MkDocs documentation with live previews
  helpers/                # Component-specific helper functions
  __tests__/
    Button.spec.tsx       # Playwright visual + functional tests
    Button.story.tsx      # Story components used as test fixtures
    _propTests/           # Reusable prop test generators (arrays of test cases)
```

## Implementation pattern

Components are `.jsx` files (not `.tsx`) using PropTypes. They:

1. Use `React.forwardRef` to forward refs to the root HTML element.
2. Are wrapped with `withGlobalProps(Component, 'ComponentName')` for global prop
   injection; the wrapped version is the default export.
3. Use `useContext` to detect layout/group contexts (`FormLayoutContext`,
   `ButtonGroupContext`, `InputGroupContext`) and apply CSS class variants
   accordingly.
4. Use the `classNames()` helper to conditionally combine CSS Module class names.
5. Use `transferProps()` to pass through non-React HTML attributes to the root
   element.

Honour the [API Guidelines](../../src/docs/contribute/api.md) and
[Composition](../../src/docs/contribute/composition.md) when shaping props and
nesting.

## Styling

Component styles use SCSS with CSS Modules — see the [styling rule](styling.md).

## Tests

Components are covered by Jest unit tests and table-driven Playwright component
tests — see the [testing rule](testing.md).
