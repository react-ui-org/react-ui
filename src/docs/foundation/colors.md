# Colors

Colors help you communicate the structure of your UI, emphasize any important
information, or signal different states of the UI. **Use colors intentionally**
— they are not decoration and should always serve a purpose.

👉 All colors on this page can be changed by
[overriding](/docs/customize/theming/overview) values in your
[design tokens](/docs/foundation/design-tokens).

## General Guidelines

- **Most colors in React UI are semantic: they bear a meaning and target a
  specific use case.** The only non-semantic exception is the
  [neutral colors](#neutral-colors) that are included in React UI due to their
  frequent usage in UI designs.
- **React UI does not try to suggest any global color palettes.** Instead, you
  are encouraged to pick any color palettes you want and map them onto the
  semantic colors of React UI.
- In general, colors in React UI can be used for either **static**
  (most of the [text colors](#text-colors) and most of the
  [background colors](#background-colors)) or **interactive** use cases
  ([action colors](#action-colors), [feedback colors](#feedback-colors)).
  However, some colors are designed to be either:
  [neutral colors](#neutral-colors) can be used for static and interactive parts
  similarly to the primary [border color](#border-colors).
- Interactive color variants always define **hover** and **active** (pressed)
  states.
- Action, feedback, and neutral colors suggest **what color should be used** for
  the text placed on them. You don't have to think if black or white makes a
  better contrast — just use `on-primary` for text on primary color background
  or `on-success` for success color background, and you should be safe.

## Text Colors

Colors reserved for text. Base text can have primary or secondary priority,
while both priorities can be suppressed with the `disabled` variants. Last but
not least, the text colors define the color of links.

<div>
  <rui-swatch color="text-primary"></rui-swatch>
  <rui-swatch color="text-primary-disabled"></rui-swatch>
  <rui-swatch color="text-secondary"></rui-swatch>
  <rui-swatch color="text-secondary-disabled"></rui-swatch>
</div>
<div>
  <rui-swatch color="text-link"></rui-swatch>
  <rui-swatch color="text-link-hover"></rui-swatch>
  <rui-swatch color="text-link-active"></rui-swatch>
</div>

## Action Colors

Action colors communicate the **importance** of an action which can be primary
or secondary. Using the _selected_ color, you can also mark an action as the
currently selected.

<div>
  <rui-swatch color="action-primary"></rui-swatch>
  <rui-swatch color="action-primary-hover"></rui-swatch>
  <rui-swatch color="action-primary-active"></rui-swatch>
  <rui-swatch color="action-on-primary"></rui-swatch>
</div>
<div>
  <rui-swatch color="action-secondary"></rui-swatch>
  <rui-swatch color="action-secondary-hover"></rui-swatch>
  <rui-swatch color="action-secondary-active"></rui-swatch>
  <rui-swatch color="action-on-secondary"></rui-swatch>
</div>
<div>
  <rui-swatch color="action-selected"></rui-swatch>
  <rui-swatch color="action-selected-hover"></rui-swatch>
  <rui-swatch color="action-selected-active"></rui-swatch>
  <rui-swatch color="action-on-selected"></rui-swatch>
</div>

## Feedback Colors

Feedback colors help communicate a meaning: green means success, orange means
warning, and red means danger or error. On top of that, there are a few more
feedback colors to fit various design situations.

<div>
  <rui-swatch color="feedback-success"></rui-swatch>
  <rui-swatch color="feedback-success-hover"></rui-swatch>
  <rui-swatch color="feedback-success-active"></rui-swatch>
  <rui-swatch color="feedback-on-success"></rui-swatch>
</div>
<div>
  <rui-swatch color="feedback-warning"></rui-swatch>
  <rui-swatch color="feedback-warning-hover"></rui-swatch>
  <rui-swatch color="feedback-warning-active"></rui-swatch>
  <rui-swatch color="feedback-on-warning"></rui-swatch>
</div>
<div>
  <rui-swatch color="feedback-danger"></rui-swatch>
  <rui-swatch color="feedback-danger-hover"></rui-swatch>
  <rui-swatch color="feedback-danger-active"></rui-swatch>
  <rui-swatch color="feedback-on-danger"></rui-swatch>
</div>
<div>
  <rui-swatch color="feedback-help"></rui-swatch>
  <rui-swatch color="feedback-help-hover"></rui-swatch>
  <rui-swatch color="feedback-help-active"></rui-swatch>
  <rui-swatch color="feedback-on-help"></rui-swatch>
</div>
<div>
  <rui-swatch color="feedback-info"></rui-swatch>
  <rui-swatch color="feedback-info-hover"></rui-swatch>
  <rui-swatch color="feedback-info-active"></rui-swatch>
  <rui-swatch color="feedback-on-info"></rui-swatch>
</div>
<div>
  <rui-swatch color="feedback-note"></rui-swatch>
  <rui-swatch color="feedback-note-hover"></rui-swatch>
  <rui-swatch color="feedback-note-active"></rui-swatch>
  <rui-swatch color="feedback-on-note"></rui-swatch>
</div>

## Neutral Colors

Neutral colors are intended for neutral variants of components that support
colors. The light color works well with dark backgrounds. Conversely, the dark
color stands out on light backgrounds.

<div>
  <rui-swatch color="neutral-light"></rui-swatch>
  <rui-swatch color="neutral-light-hover"></rui-swatch>
  <rui-swatch color="neutral-light-active"></rui-swatch>
  <rui-swatch color="neutral-on-light"></rui-swatch>
</div>
<div>
  <rui-swatch color="neutral-dark"></rui-swatch>
  <rui-swatch color="neutral-dark-hover"></rui-swatch>
  <rui-swatch color="neutral-dark-active"></rui-swatch>
  <rui-swatch color="neutral-on-dark"></rui-swatch>
</div>

## Background Colors

Colors reserved for backgrounds.

### Content Layers

Backgrounds for the fundamental UI areas and content layering.

👉 Content layers can be separated from background using their
[shadow counterparts](/docs/foundation/shadows): `background-layer-1` +
`shadow-layer-1` etc.

<div>
  <rui-swatch color="background-base"></rui-swatch>
  <rui-swatch color="background-layer-1"></rui-swatch>
  <rui-swatch color="background-layer-2"></rui-swatch>
</div>

### Component Backgrounds

Basic backgrounds for components.

💡 What is the difference between `background-base` and `background-basic`?
While the _base_ background is intended for the bottom-most layer of your UI,
the _basic_ background is the default go-to background for components.

<div>
  <rui-swatch color="background-basic"></rui-swatch>
  <rui-swatch color="background-disabled"></rui-swatch>
</div>

### Interactive Areas

Backgrounds to highlight interactive areas on hover and during interaction.

💡 Please note the default interactive background is always transparent, so it
does not stand in the way of the underlying component background.

<div>
  <rui-swatch color="background-interactive"></rui-swatch>
  <rui-swatch color="background-interactive-hover"></rui-swatch>
  <rui-swatch color="background-interactive-active"></rui-swatch>
</div>

### Action Backgrounds

Backgrounds for areas with actionable content.

<div>
  <rui-swatch color="background-primary"></rui-swatch>
  <rui-swatch color="background-secondary"></rui-swatch>
  <rui-swatch color="background-selected"></rui-swatch>
</div>

### Feedback Backgrounds

Backgrounds for feedback areas.

<div>
  <rui-swatch color="background-success"></rui-swatch>
  <rui-swatch color="background-warning"></rui-swatch>
  <rui-swatch color="background-danger"></rui-swatch>
  <rui-swatch color="background-help"></rui-swatch>
  <rui-swatch color="background-info"></rui-swatch>
  <rui-swatch color="background-note"></rui-swatch>
</div>

### Neutral Backgrounds

Neutral backgrounds to help you structure your content.

<div>
  <rui-swatch color="background-light"></rui-swatch>
  <rui-swatch color="background-dark"></rui-swatch>
</div>

## Border Colors

Colors reserved for borders. With borders, you can separate content areas,
components, or their parts. For interactive context, you should always use the
primary border.

<div>
  <rui-swatch color="border-primary"></rui-swatch>
  <rui-swatch color="border-primary-hover"></rui-swatch>
  <rui-swatch color="border-primary-active"></rui-swatch>
  <rui-swatch color="border-secondary"></rui-swatch>
</div>

## Applying Colors

Components can apply colors above using one or more following approaches.

### Color Collections

Some components ([Alert](/components/Alert), [Badge](/components/Badge),
[Button](/components/Button), and more) come in more color variants to help you
better reflect their place in content hierarchy or the meaning of their content.
In such cases, one or more [Color Collections][collection-colors] are always
used. There is always a reasonable default color for the component in question
that can be changed to any of supported collection values through the `color`
prop.

### Validation States

All form field components that support validation states
([CheckboxField](/components/CheckboxField),
[TextField](/components/TextField), [Toggle](/components/Toggle) and more)
apply selected [feedback colors](#feedback-colors) for individual states:

- `success` feedback color for **valid** state,
- `warning` feedback color for **warning** state,
- `danger` feedback color for **invalid** state.

Validation state is always optional. Default styling is applied for the given
component when its `validationState` prop is not specified.

[collection-colors]: /docs/foundation/collections#colors
