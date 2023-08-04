# API Guidelines

Guiding principles for designing component APIs.

## Visual Props: API vs. Theme

While a custom theme is intended to define visual and interaction settings,
component API can be designed to allow customization of many kinds, including
the visual properties. This may be confusing during the design process of a
component. So how do you reliably know which approach you need?

The key difference is whether you want to enable overriding the default value in
the component instance:

> Do I want to allow overriding this particular visual setting in a component
instance?

- If yes, put it into the API of the component. Developers can adjust their
  [global props](/docs/customize/global-props), but the option value can still be
  overridden per component instance.
- If not, put it into the theme. Developers can change it
  [in their theme](/docs/customize/theming/overview) and it will be
  the same for all component instances.

## Measures

Always use [spacing values](/docs/foundation/spacing) for all kinds of measures like
offsets, gaps, or spacings. This helps keep the design consistent across
components.
