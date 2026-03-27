# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands below are meant to be run directly inside the Docker container `devcontainer`.
If project is started using Development Containers, run it without starting the Docker.


```bash
npm run lint                          # All linters (ESLint + Stylelint + Markdownlint)
npm run eslint                        # JS + TS linting
npm run stylelint                     # SCSS linting
npm run test:jest                     # All Jest unit tests
npm run test:jest:ts -- <file>        # Single TypeScript test file
npm run test:jest:js -- <file>        # Single JavaScript test file
npm run test:playwright-ct:all                          # All component tests
npm run test:playwright-ct:all-with-update              # Update snapshots
npm run test:playwright-ct:all -- -- src/components/Button   # Tests for one component
npm run test:playwright-ct:show-report                  # Serve test report at localhost:9323
```

Playwright snapshots must always be generated inside the Docker container — snapshots differ between operating systems.

## Architecture

React UI is a themeable React component library. It is distributed in two ways:

- **UMD bundle** with separate CSS — ready to use out of the box
- **ESM** — users are responsible for their own SASS pipeline to compile the styles

### Component structure

Each component lives in `src/components/<ComponentName>/` and follows this layout:

```
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
    Button.spec.tsx        # Playwright visual + functional tests
    Button.story.tsx       # Story components used as test fixtures
    _propTests/            # Reusable prop test generators (arrays of test cases)
```

### Component implementation pattern

Components are `.jsx` files (not `.tsx`) using PropTypes. They:
1. Use `React.forwardRef` to forward refs to the root HTML element
2. Are wrapped with `withGlobalProps(Component, 'ComponentName')` for global prop injection; the wrapped version is the default export
3. Use `useContext` to detect layout/group contexts (`FormLayoutContext`, `ButtonGroupContext`, `InputGroupContext`) and apply CSS class variants accordingly
4. Use `classNames()` helper to conditionally combine CSS Module class names
5. Use `transferProps()` to pass through non-React HTML attributes to the root element

### Styling

- CSS Modules (`.module.scss`) with camelCase class names
- Class naming convention: `root` for the root element; modifiers follow `isRootXxx` (state), `hasRootXxx` (has feature), `isRootInXxx` (context), `isRootLayoutXxx` (layout variant)
- `src/styles/` contains the global theming system: settings (variables), tools (mixins), and a large set of CSS custom properties for theming
- Component SCSS files `@use` their own `settings`, `theme`, `tools` partials plus shared styles from `src/styles/`

### Testing patterns

**Playwright component tests** (`.spec.tsx`) use a table-driven pattern:
- Import arrays of test cases from `_propTests/` directories and from shared `tests/playwright/propTests/`
- Each test case is `{ name, props, onBeforeTest?, onBeforeSnapshot? }`; custom field tests add `customFieldLayoutProps`, `customFieldProps`, etc.
- `mixPropTests([...arrays])` generates the cartesian product of multiple prop arrays
- `propTests` from `tests/playwright/` provides standard reusable test sets (e.g. `layoutPropTest`, `sizePropTest`, `disabledPropTest`)
- Snapshot images are stored alongside the spec file in `<ComponentName>.spec.tsx-snapshots/`

**Story components** (`.story.tsx`) wrap the real component in a minimal fixture (sometimes inside a context provider) and are imported only by `.spec.tsx` files. Naming convention: `<ComponentName>ForTest`, `<ComponentName>ForRefTest`, `<ComponentName>ForFormLayoutTests` — FormLayout story component is always last.

**Test describe structure:** `test.describe('ComponentName')` → `test.describe('base')` (if present) → `visual` / `non-visual` / `functionality`; `formLayout` describe is always the last block at the same level as `base`.

### Git workflow

Branch naming: `bc/*`, `feature/*`, `bugfix/*`, `refactoring/*`, `docs/*`, `maintenance/*`

Commit messages: imperative English, component names in backticks (e.g. `` Add `FormLayout` context awareness to `Button` ``). No `Co-Authored-By` lines.

PR names follow the same rules as commit messages and are used directly in the changelog. Only PRs into `master` appear in the changelog.
