<!-- Allow multiple headings with the same content: -->
<!-- https://github.com/DavidAnson/markdownlint/blob/main/doc/md024.md -->
<!-- markdownlint-disable MD024 -->

# CSS Guidelines

Basic rules to follow when authoring React UI CSS.

## Coding Style

React UI uses [Stylelint] to avoid errors in CSS and enforce unified coding
style across all stylesheets.

Configurations used:

- [`stylelint-config-visionapps`][stylelint-config-visionapps] — a more strict
  extension of popular community preset
  [`stylelint-config-standard`][stylelint-config-standard].

- [`stylelint-config-visionapps-order`][stylelint-config-visionapps-order] —
  an opinionated list of CSS properties order.

- [`stylelint-config-css-modules`][stylelint-config-css-modules] — tweak of
  Stylelint rules for CSS modules.

## CSS Architecture

Without [Web Components], there is no such thing as a complete encapsulation of
a component. Inside browser window, a React app is still a bunch of HTML and CSS
(and JS, of course) living in the same global context. Developers can fight
against CSS cascade, inheritance and specificity, or accept these principles,
and even benefit from them. Understanding how CSS works and making use of this
knowledge leads towards smaller stylesheets, easier maintenance, and better
performance.

To be able to handle CSS at such a large scale of a UI library, React UI works
**in harmony with fundamental CSS principles.** Most importantly, all CSS is
written in specificity order, i.e. from lowest to highest specificity. This idea
was most famously shaped and popularized by Harry Roberts in his [ITCSS]
architecture. React UI draws inspiration from ITCSS which can be seen the best
in the [foundation CSS layer] (and its [source][foundation-css-source]).

### File Structure

There are three simple rules to follow when organizing React UI CSS:

1. Component styles must be placed in component's directory.
2. Components must not import other component's styles.
3. Any CSS that needs to be shared across multiple components and/or global
   styles must be placed in the `src/styles` directory.

👉 All React UI CSS is written in Sass.
[Learn more about preprocessing with Sass.](#preprocessing-with-sass)

```txt
├── src
    ├── …
    └── lib                       Main source directory, contains global Sass endpoints
        ├── components            React components with their stylesheets
            ├── *
                ├── <Component>
                    ├── …
                    ├── _settings.scss           Component's non-themeable Sass variables
                    ├── _theme.scss              Component's Sass interface to its CSS custom properties in `theme.scss`
                    ├── _tools.scss              Component's Sass mixins and functions
                    ├── Component.module.scss    Component's main stylesheet loaded as CSS Module
                    └── …
        ├── …
        ├── styles                Partials for top-level Sass endpoints and shared styles
            ├── elements          Styles for unclassed HTML elements (type selectors)
            ├── generic           Global ground-zero styles
            ├── helpers           Helper classes
            ├── settings          Sass variables shared across global styles and/or multiple components
            ├── theme             Sass interface to `theme.scss`, used in global styles or across multiple components
            ├── theme-constants   Sass variables for use only within `theme.scss`
            ├── tools             Sass mixins and functions shared across global styles and/or multiple components
            └── _utilities.scss   Sass loop that generates utility classes from `settings/_utilities.scss` config
        ├── …
        ├── foundation.scss       Mandatory themeable CSS layer, ground-zero for React components
        ├── helpers.scss          Optional set of helper and utility classes
        └── theme.scss            Default theme, a collection of hundreds of CSS custom properties
```

### Cascade Layers

React UI CSS is organized into [cascade layers], each with its own specificity
level. The layers are as follows:

1. `@layer theme` — a collection of hundreds of [CSS custom properties] that
   define the look and feel of your UI.
2. `@layer foundation` — mandatory ground-zero CSS for components and other
   styling. Includes sublayers like `@layer foundation.generic` and
   `@layer foundation.elements`.
3. `@layer helpers` — small styling abstractions that can be used across the
   whole UI.
4. `@layer components` — component styles are written as CSS modules which
   output into this layer. Also, each component has its own cascade layer, e.g.
   `@layer components.modal`.
5. `@layer utilities` — tiny classes to control selected CSS properties,
   forcing them with `!important`.

Any custom CSS can be added to the end of the cascade, but it's recommended to
use any of the existing layers to keep the CSS organized.

👉 With `!important` styles, layered styles take precedence over unlayered
styles.

## CSS Modules

For components, React UI leverages [CSS modules] (not to be confused with
[modular CSS specification] of the same name) to take advantage of writing
native CSS (meaning “not JSS or CSS in JS”). Together with
[Sass](#preprocessing-with-sass), CSS modules represent flexibility and popular
programming features needed to author modern stylesheets perfectly familiar to
traditional CSS developers.

### Components

CSS modules help keeping source class names short and clear. The same class name
can be used in another component with different styling. Final class names
are converted by tooling and composed of component name, original class name,
and a random suffix which makes them unique in global context of the whole web
app.

For example, this JSX:

```jsx
// Button.jsx

<button className={styles.root}>
  <span className={styles.beforeLabel}>{beforeLabel}</span>
  <span className={styles.label}>{label}</span>
  <span className={styles.afterLabel}>{afterLabel}</span>
</button>
```

… with this SCSS:

```scss
// Button.module.scss

.root {
 // …
}

.beforeLabel {
 // …
}

.afterLabel {
 // …
}

.label {
  // …
}
```

… produces following CSS class names:

- `Button-module__root__2yVxr5IZ`
- `Button-module__beforeLabel__1rrmrrWj`
- `Button-module__afterLabel__38eMTilM`
- `Button-module__label__23iTNlfS`

Resulting CSS class names are both unique and human-readable at the same time
which is convenient for development. Class names are further shortened and
obfuscated for production environments.

### Class Naming Rules

Following rules make it clear both in JSX and CSS what is affected by a CSS
class.

1. **Class names must use camelCase notation** to be usable in JavaScript
   context.

2. **Short, preferably single-word names should be chosen for all component
   elements.** No naming convention like BEM or SUIT CSS needs to be applied
   since class names are unique in the global scope thanks to CSS modules.
   Conventions for modifier classes are covered by the rules below.

3. **Component's top-level HTML element must have `root` class name.**
   However, this rule has a few exceptions:

    1. When the component is a subcomponent, it's usually better to use
       subcomponent's name, e.g. `item` or `group`. This enables us to keep
       related CSS of both the main component and its subcomponents in a single
       file and see the big picture during development.

    2. When no CSS on the root element is necessary and styling only takes place
       once a visual modification is invoked by component props, `root` class
       name can be omitted entirely.

4. **Modifier class names related to the current HTML element must start with
   `is`** and contain the name of the target element, e.g. `isRootLoading`
   (modifies `root`) or `isLabelHidden` (modifies `label`). However, child
   elements may be modified as well, e.g. by a CSS selector like
   `.isRootRequired > .label` (root is marked as required but the label is what
   needs to be visually modified).

5. **Modifier class names related to child elements must start with `has`**
    and refer to the element in question, e.g. `hasRootSmallInput` (applies
    styling on `root` but relates to `input`).

## Custom Properties

React UI takes advantage of supporting [modern browsers] and uses
[CSS custom properties] to make writing and maintaining CSS more efficient.

There are three kinds of custom properties used:

1. `--rui-local-*` for internal (component-scoped, local) custom properties.
   May reuse other custom property types.

2. `--rui-custom-*` for any custom properties whose value comes from component's
   API. May reuse other custom property types.

3. `--rui-*` (unscoped for the sake of brevity) for theme-related custom
   properties. Part of public API, designed to be customized. Must not reuse
   other custom property types. Refer to the [theming overview] to learn how
   their names are created.

## Helpers and Utilities

There are also global helper and utility classes (both documented as CSS Helpers
for the sake of comprehensibility for non-CSS guys) that can be used by
developers and thus remain unaltered by CSS modules.

### Class Naming Rules

Class names must use kebab-case notation to be usable in HTML context.

## Preprocessing with Sass

All React UI CSS source is written in SCSS syntax of [Sass] preprocessor.

- **Sass variables, mixins and functions must use kebab-case notation.**

- **Only [Sass modules] must be used to organize** Sass source files, `@import`
  is deprecated. Using scoped variables, mixins and functions (those starting
  with `_`) is highly recommended whenever appropriate.

- **[Built-in Sass modules] should be preferred** over older Sass functions that
  are deprecated, e.g. `map.get()` instead of `map-get()`.

- **Mixins that lead to duplicate CSS should be avoided.** If possible, combine
  multiple CSS selectors for the desired rule set to achieve the same result.

- **Extend functionality should be avoided entirely** due to its hardly
  predictable behavior.

- **Classes that are automatically generated by Sass loops should be handled
  with care.** With loops, it's easy to produce a lot of CSS and negatively
  impact performance.

## Postprocessing with PostCSS

All styles are automatically prefixed by [Autoprefixer] plugin for [PostCSS]
according to [Browserslist] configuration stored in `.browserslistrc`.

[Stylelint]: https://stylelint.io
[stylelint-config-visionapps]: https://github.com/visionappscz/stylelint-config-visionapps
[stylelint-config-standard]: https://github.com/stylelint/stylelint-config-standard
[stylelint-config-visionapps-order]: https://github.com/visionappscz/stylelint-config-visionapps-order
[stylelint-config-css-modules]: https://github.com/pascalduez/stylelint-config-css-modules
[Web Components]: https://developer.mozilla.org/en-US/docs/Web/Web_Components
[foundation CSS layer]: /docs/getting-started/usage#foundation-css
[foundation-css-source]: https://github.com/react-ui-org/react-ui/blob/master/src/foundation.scss
[cascade layers]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_layers
[CSS modules]: https://github.com/css-modules/css-modules
[modular CSS specification]: https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS#css_modules
[modern browsers]: /docs/getting-started/browsers-and-devices
[CSS custom properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
[theming overview]: /docs/customize/theming/overview
[Sass]: https://sass-lang.com
[Sass modules]: https://sass-lang.com/blog/the-module-system-is-launched
[Built-in Sass modules]: https://sass-lang.com/documentation/modules
[Autoprefixer]: https://autoprefixer.github.io
[PostCSS]: https://postcss.org
[Browserslist]: https://github.com/browserslist/browserslist
