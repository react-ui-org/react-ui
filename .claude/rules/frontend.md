---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Frontend (React component library)

## Commands

* If dependencies change, run `npm ci`.
* Run `npm run eslint` after changes (add `-- --fix` to autofix) and
  `npm run typecheck` (TypeScript 7 `tsc --noEmit`).
* To verify a rendered component or the docs previews in a real browser
  (navigate, click, screenshot, inspect the running docs site), drive host
  Chrome through the `chrome-host` MCP. See
  [AI Integration](../../src/docs/contribute/ai-integration.md).

## Stack

React UI is a themeable React component library, distributed as a UMD bundle
(with separate CSS) and as ESM (consumers run their own SASS pipeline).
Components are TypeScript / TSX for React 18. Babel (`@babel/preset-typescript`)
transpiles for the bundle and Jest; TypeScript 7 (`tsc`) type-checks
(`strict: true`) and emits the published declarations (`dist/types`, via
`tsconfig.build.json` in `npm run build`); `dts-bundle-generator` then flattens
them into the single `dist/react-ui.d.ts` referenced by `package.json`
`types`. TypeScript 6 is installed alongside
under the `typescript` package name for tools that need the compiler API
(typescript-eslint). Components additionally keep `prop-types` for runtime
validation.

Plain function components are annotated as `React.FunctionComponent<Props>`
so their `propTypes` do not leak into the emitted declarations.

## Component structure

Each component lives in `src/components/<ComponentName>/` and follows this
layout:

```text
Button/
  Button.tsx              # Component implementation (React.forwardRef + withGlobalProps)
  Button.types.ts         # `ButtonProps` and component-specific unions
  Button.module.scss      # CSS Modules styles
  index.ts                # Re-exports default (withGlobalProps-wrapped) as named export and types
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

Components are `.tsx` files. They:

1. Use `React.forwardRef<Element, Props>` to forward refs to the root HTML
   element, destructuring props with default values in the parameter (this is
   what react-docgen reads for documented defaults). No `defaultProps`.
2. Are wrapped with `withGlobalProps(Component, 'ComponentName')` for global prop
   injection; the wrapped version is the default export.
3. Use `useContext` to detect layout/group contexts (`FormLayoutContext`,
   `ButtonGroupContext`, `InputGroupContext`) and apply CSS class variants
   accordingly.
4. Use the `classNames()` helper to conditionally combine CSS Module class names.
5. Use `transferProps()` to pass through non-React HTML attributes to the root
   element.
6. Declare `Props` in `<ComponentName>.types.ts` (extending the matching
   `*HTMLAttributes` type) and export it from `index.ts`. Reuse shared unions
   from `src/types` (`Color`, `Priority`, `Size`, `Layout`, `ValidationState`,
   …); component-specific unions stay in the component directory. Every
   type lives in a `.types.ts` file next to its implementation — including
   context values (`<ComponentName>ContextValue`), provider props and helper
   types (`transferProps.types.ts`, `mergeDeep.types.ts`); implementation
   files declare no `type`/`interface` and `.types.ts` files contain no
   runtime code. `*Context.ts` files contain only `createContext`.
7. Keep `propTypes` (with the JSDoc descriptions — they are the documentation
   source for `docoff-react-props`) preceded by the
   `@typescript-eslint/no-deprecated` disable comment.

Honour the [API Guidelines](../../src/docs/contribute/api.md) and
[Composition](../../src/docs/contribute/composition.md) when shaping props and
nesting.

## Styling

Component styles use SCSS with CSS Modules — see the [styling rule](styling.md).

## Tests

Components are covered by Jest unit tests and table-driven Playwright component
tests — see the [testing rule](testing.md).
