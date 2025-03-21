# Collections

Collections are lists of available values that can be used to customize the
appearance of components, such as colors, sizes, and placement. Collections are
used to ensure consistency across the design system.

## General Guidelines

- Components can support one or more collections from a collection category.
  Refer to the documentation for each component to see which collections are
  available.
- If an option from a collection is used in a component, all other options from
  the same collection must be available for use in that component too.

## Colors

The following color names are designed for use in components that support the
`color` prop:

| Collection | Available values                                       | Description                                                                      |
|------------|--------------------------------------------------------|----------------------------------------------------------------------------------|
| Action     | `primary`, `secondary`, `selected`                     | Reserved for actionable elements, such as buttons and navigation links           |
| Feedback   | `success`, `warning`, `danger`, `info`, `help`, `note` | For components with feedback state, such as alerts and badges                    |
| Neutral    | `light`, `dark`                                        | For components that require a neutral background color, such as cards and badges |
