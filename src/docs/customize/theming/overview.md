# Theming

From the very beginning, React UI has been designed with a great emphasis on
customizability. We decided to leverage [CSS custom properties] for this feature
for two main reasons:

1. We take advantage of the possibilities of **native CSS**. Preprocessors are
   still a thing, but it's not necessary to go as far as for CSS-in-JS to make
   a UI customizable, not even speaking of performance.

2. Thanks to JavaScript API, CSS custom properties are both **readable and
   writable by JS**.

## Theming Options

[Design tokens](/docs/foundation/design-tokens) define common visual properties like
colors, fonts, borders, shadows, or spacing. [CSS custom properties] are the
technical representation of the design tokens in React UI.

All CSS custom properties in React UI come prefixed with `rui` so they don't
get in the way of other custom properties in your project.

You can adjust any of the properties in your styles. See the [default theme] for
the full list of available design tokens.

### Global and Semantic Design Tokens

Global and semantic token names are not complex or long. That is why they are
simply lowercase and hyphenated.

The names are written in the following format:

`--rui-<type>-[<group>]-<name>-[<state>]`

Where:

- `<type>` is one of: `color`, `dimension`, `font-family`, `font-weight`,
  `shadow`, as suggested by the [Design Tokens Format][dtf] proposal. However,
  additional custom types like `font-size`, `line-height`, or `text-decoration`
  have been added as they proved necessary.
- `<group>` optionally groups multiple related values, e.g. `text`,
  `background`, `action`, etc.
- `<name>` is the name of the token, e.g. `primary`, `base`, or `light`. Scales
  can be presented as numbered sequences, e.g. `space-[0-7]`, `size-[1-6]`, etc.
- `<state>` describes additional interaction variants of the token: `hover`,
  `focus`, `active`, or `disabled`.

Example global and semantic design tokens represented by CSS custom properties:

```css
:root {
  --rui-color-text-primary: #000;
  --rui-dimension-space-3: 0.75rem;
  --rui-font-family-base: "Titillium Web", helvetica, roboto, arial, sans-serif;
}
```

️👉 Please note that **breakpoint values are read-only** (e.g. for JavaScript)
since CSS custom properties
[cannot be used within media queries][w3c-custom-properties] (because a media
query is not a CSS property).

### Component Tokens

It is also possible to adjust some properties on individual components level,
preferably by reusing (inheriting) the semantic design tokens.

Due to higher complexity, component tokens use a naming convention that many web
developers will find familiar because it works like [BEM] (with prefixes and
component name syntax taken from [SUIT CSS], to be precise):

`--rui-<ComponentName>--[<modification(s)>]__[<element>]--[<modification(s)>]__<property>--[<modification>]`

Where:

- `<ComponentName>` stands for the actual component name (e.g. `Button`,
  `FormField`, etc.) with a reasonable exception to form fields whose settings
  are widely shared and therefore grouped as `FormField` options.
- `<modifications(s)>` can be one or more modifiers, typically a variant (e.g.
  `primary`, `filled`, `box`) or interaction state (`default`, `hover`,
  `focus`, `active`, `disabled`).
- `<element>` stands for a nested element of the component.
- `<property>` is usually a CSS property (e.g. `color`, `background`,
  `background-color`, `width`, `box-shadow`), or a brief property description
  where a CSS property wouldn't tell enough (e.g. `initial-offset`,
  `check-background-color`, `tap-target-size`).

Example component tokens:

```css
:root {
  --rui-Button--filled--primary--default__color: var(--rui-color-action-on-primary);
  --rui-Button--filled--primary--default__border-color: var(--rui-color-action-primary);
  --rui-Button--filled--primary--default__background: var(--rui-color-action-primary);
  --rui-Button--filled--primary--default__box-shadow: none;
  --rui-Button--filled--primary--hover__color: var(--rui-color-action-on-primary);
  --rui-Button--filled--primary--hover__border-color: var(--rui-color-action-primary-hover);
  --rui-Button--filled--primary--hover__background: var(--rui-color-action-primary-hover);
  --rui-Button--filled--primary--hover__box-shadow: none;
}
```

## Best Practices

1. It's a good idea to start with changing the **global tokens first**. Adjust
   any context-agnostic values to see how the system reacts and scales.

2. Widely reused context-aware settings such as semantic colors, typography, or
   borders define the character of your design system which is stored in the
   **semantic tokens** layer.

3. Having finished the customization at the global and semantic level, you can
   **then proceed to customize the appearance of individual components** — if
   necessary at all.

   Even then you should also reuse existing semantic design tokens as much as
   possible to ensure that your UI is consistent and works as a system.

   For the same reason, if you have any custom components in your UI, you should
   **reuse the semantic design tokens in your own CSS** too.

## CSS, or Sass?

Colors, breakpoints, and SVG definitions used in `theme.scss` are preprocessed
with Sass first. This enables us to:

- generate our internal color palette programmatically,
- keep actual breakpoint values in a single place in the code,
- keep `theme.scss` uncluttered by inline SVG.

It's entirely up to you what format you decide to use for storing the theme.
Both `theme.scss` and `theme.css` will work equally well. It only matters if the
custom properties make it from the theme file to the browser.

👉 Just remember everything in the [theme constants] directory is intended only
for usage within `theme.scss`. Otherwise, the theming system may not work as
expected. We recommend calling custom properties from `theme.scss` either
directly in your stylesheet, or through an intermediate, shareable layer like
`MyComponent/_theme.scss` or
`styles/shared-by-components/_my-sass-variables-referring-to-theme.scss`
(the latter of which is the approach we use).

[CSS custom properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
[default theme]: https://github.com/react-ui-org/react-ui/blob/master/src/theme.scss
[dtf]: https://design-tokens.github.io/community-group/format/
[theme constants]: https://github.com/react-ui-org/react-ui/blob/master/src/styles/theme-constants
[w3c-custom-properties]: https://www.w3.org/TR/css-variables-1/#using-variables
[BEM]: https://getbem.com
[SUIT CSS]: https://suitcss.github.io
