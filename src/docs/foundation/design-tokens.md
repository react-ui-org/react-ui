# Design Tokens

Design tokens are a [methodology] for **expressing design decisions** in a
platform-agnostic way so that they can be shared across different disciplines,
tools, and technologies. They help establish a common vocabulary across
organizations.

👉 Design tokens are your starting point for
[customization](/docs/customize/theming/overview) of React UI to make it fit your
design system needs. React UI uses CSS custom properties as a primary storage
format for design tokens.

## Global Tokens

Global tokens represent the basic, context-agnostic values in your design
language. They define color palettes, typography scales, or spacing values,
without binding them to any semantic meaning.

```css
:root {
  --pantone-3145c: #00778b;
}
```

## Semantic Tokens

Semantic tokens define roles and decisions that give the design system its
character. They communicate the intended purpose of a global token and are often
reused by component tokens.

```css
:root {
  --rui-color-action-primary: var(--pantone-3145c);
}
```

## Component Tokens

Component tokens represent the values associated with a component. They often
inherit from semantic tokens, but are named in a way that narrows down their
reusability to the context of the specific component.

```css
:root {
  --rui-Button--filled--primary--default__background: var(--rui-color-action-primary);
}
```

[methodology]: https://uxdesign.cc/design-tokens-for-dummies-8acebf010d71
