# Accessibility

React UI bakes accessibility principles right into its core.

👉 You can adjust all custom properties on this page (and more) in your theme by
overriding values in the
[design tokens](/docs/customize/theming/overview#design-tokens) section.

## Touch Friendliness

The active area of interactive elements should be properly sized so that the
elements can be easily targeted on touch screens. Recommended dimensions may
vary from platform to platform, however a commonly used size is 7–10 mm.

Default tap target size in React UI is used by all potentially small interactive
components like [Alert](/components/Alert) close button,
[CheckboxField](/components/CheckboxField), or [Toggle](/components/Toggle).
Tap target size can be adjusted via the `--rui-dimension-tap-target-size`
custom property (see [Theming](/docs/customize/theming/overview) to learn how).

📖 [Read more about touch targets at Norman Nielsen Group.][nn-group]

### Form Fields and Reserved Space

Note that form fields with potentially small inputs (like
[CheckboxField](/components/CheckboxField) or
[Toggle](/components/Toggle)) reserve vertical space corresponding to the
minimum tap target size. In other words, form fields **box model is taller.**
The reason behind this behaviour is that in many cases the minimum tap target
size could overflow its component's box model and tap targets of neighboring
components could collide. The extra added space prevents this.

However, if placed inside [FormLayout](/components/FormLayout), form
fields do not add any extra vertical space because it is already provided by
`FormLayout` row gap. Remember to check that form fields in your `FormLayout`
are properly spaced and interactive elements do not collide should you decide to
make any changes to `--rui-dimension-tap-target-size`,
`--rui-FormField--check__tap-target-size` or `--rui-FormLayout__row-gap` options.

Horizontal padding is never added to form fields box model so it does not make
their horizontal alignment complicated.

## Keyboard Friendliness

Many people use keyboard to control their computer. Interactive elements in
React UI are **highlighted on focus** so keyboard users can easily tab over
them and see what control currently has focus.

All interactive elements obtain a blue outline on focus. Appearance of the focus
highlight can be [adjusted](/docs/customize/theming/overview) with the following
custom properties:

- `--rui-border-focus-ring`,
- `--rui-dimension-focus-ring-offset`,
- `--rui-shadow-focus-ring` (set to `initial` to keep the original box shadow
  if there is one).

📖 [Read more about keyboard accessibility at MDN.][mdn-keyboard]

[nn-group]: https://www.nngroup.com/articles/touch-target-size/
[mdn-keyboard]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Keyboard
