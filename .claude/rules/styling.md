---
paths:
  - "src/**/*.scss"
  - "src/**/*.css"
---

# Styling

## Commands

Run `npm run stylelint` after changes (add `-- --fix` to autofix).

## Styling

Styles use SCSS with CSS Modules (`.module.scss`) with camelCase class names. A
component's styles live next to it as `Foo.module.scss` and are imported as a
module.

Class naming convention:

* `root` for the root element.
* Modifiers follow `isRootXxx` (state), `hasRootXxx` (has feature),
  `isRootInXxx` (context), `isRootLayoutXxx` (layout variant).

`src/styles/` contains the global theming system: settings (variables), tools
(mixins), and a large set of CSS custom properties for theming. Component SCSS
files `@use` their own `_settings`, `_theme`, `_tools` partials plus the shared
styles from `src/styles/`. Theme tokens are exposed as CSS custom properties.

## Reference

* [CSS Guidelines](../../src/docs/contribute/css.md)
