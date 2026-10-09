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

| Collection | Available values                                       | Description                                                                        |
|------------|--------------------------------------------------------|------------------------------------------------------------------------------------|
| Action     | `primary`, `secondary`, `selected`                     | Reserved for actionable elements, such as buttons and navigation links             |
| Feedback   | `success`, `warning`, `danger`, `info`, `help`, `note` | For components with feedback state, such as alerts and buttons                     |
| Neutral    | `light`, `dark`                                        | For components that require a neutral background color, such as badges and buttons |

## States

The following state names are designed for use in components that support the
`state` prop, such as form fields:

| Collection | Available values                         | Description                      |
|------------|------------------------------------------|----------------------------------|
| State      | `valid`, `invalid`, `warning`, `changed` | Condition of data in a component |

Unlike colors, a state is not a matter of style. It follows from the data: the
result of its validation (`valid`, `invalid`, `warning`), or its comparison with
the saved value (`changed`). That is also why `warning` state is not the same as
`warning` feedback color, although they look alike.

A component shows one state at a time. When data is in more states at once, such
as changed and invalid, it's up to you to pick the one that matters more to the
user. Where React UI picks the state itself, e.g. in
[InputGroup](../../components/InputGroup/README.md), the order is: `invalid`, `warning`,
`changed`, `valid`.
