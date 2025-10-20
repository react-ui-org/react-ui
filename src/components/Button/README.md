# Button

Buttons allow users to take actions.

## Basic Usage

To implement the Button component, you need to import it first:

```js
import { Button } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<Button label="My button" />
```

See [API](#api) for all available options.

## General Guidelines

- Use **short yet comprehensible labels** to make buttons fit small screens.

- Since buttons are there to take actions, **use a verb** to make it obvious
    what your buttons do.

- **Don't overwhelm your UI** with too many high-emphasis actions. There should
    always be one but chances are that having more of them is not necessary.

- Ensure the **button action is well recognizable** across your target audience.
    This is especially important when using the button [with an icon only](#icon-buttons).

## Priorities

There are three **visual priorities** of buttons to choose from, from highest to
lowest:

1. filled
2. outline
3. flat

All priorities are available in colors from supported
[color collections](/docs/foundation/collections#colors).
Check [API](#api) to see which collections are supported.

### Filled

The default, high-emphasis priority should be used for primary actions of your
app. Use it sparingly but remember there should always be one on a screen.

```docoff-react-preview
<Button label="Primary" />
<Button label="Secondary" color="secondary" />
<Button label="Selected" color="selected" />
<Button label="Success" color="success" />
<Button label="Warning" color="warning" />
<Button label="Danger" color="danger" />
<Button label="Help" color="help" />
<Button label="Info" color="info" />
<Button label="Note" color="note" />
<docoff-placeholder dark inline>
  <Button label="Light" color="light" />
</docoff-placeholder>
<Button label="Dark" color="dark" />
```

Default, unconfigured button comes in **medium** size, **filled** visual
priority, and **primary** color variant.

### Outline

Medium-emphasis buttons. They are designed to contain actions that are
important but not primary in your app.

```docoff-react-preview
<Button priority="outline" label="Primary" />
<Button priority="outline" label="Secondary" color="secondary" />
<Button priority="outline" label="Selected" color="selected" />
<Button priority="outline" label="Success" color="success" />
<Button priority="outline" label="Warning" color="warning" />
<Button priority="outline" label="Danger" color="danger" />
<Button priority="outline" label="Help" color="help" />
<Button priority="outline" label="Info" color="info" />
<Button priority="outline" label="Note" color="note" />
<docoff-placeholder dark inline>
  <Button priority="outline" label="Light" color="light" />
</docoff-placeholder>
<Button priority="outline" label="Dark" color="dark" />
```

### Flat

Flat buttons are designed for less pronounced actions to help maintain focus on
the content.

```docoff-react-preview
<Button priority="flat" label="Primary" />
<Button priority="flat" label="Secondary" color="secondary" />
<Button priority="flat" label="Selected" color="selected" />
<Button priority="flat" label="Success" color="success" />
<Button priority="flat" label="Warning" color="warning" />
<Button priority="flat" label="Danger" color="danger" />
<Button priority="flat" label="Help" color="help" />
<Button priority="flat" label="Info" color="info" />
<Button priority="flat" label="Note" color="note" />
<docoff-placeholder dark inline>
  <Button priority="flat" label="Light" color="light" />
</docoff-placeholder>
<Button priority="flat" label="Dark" color="dark" />
```

## Sizes

Aside from the default (medium) size, two additional sizes are available: small
and large.

```docoff-react-preview
<Button label="Small" size="small" />
<Button label="Medium" />
<Button label="Large" size="large" />
```

Block buttons span the full width of a parent:

```docoff-react-preview
<Button label="Block button" block />
```

## Buttons with Icons

To improve clarity or to draw attention to the action, icons can be added
before or after the button's label.

👉 Please note there are no icons pre-packed in React UI. Visit
[Icons](/docs/foundation/icons) to see how to include them.

```docoff-react-preview
<Button
  label="Icon before label"
  beforeLabel={<rui-icon icon="star" />}
/>
<Button
  label="Icon after label"
  afterLabel={<rui-icon icon="star" />}
/>
```

### Icon Buttons

With a common and well-known icon, buttons can visually consist just of an icon.
Label remains mandatory to keep the button accessible when using assistive
technologies.

👉 Use `labelVisibility="xs"` to make label always visible.

```docoff-react-preview
  <Button
    label="Icon button"
    labelVisibility="none"
    beforeLabel={<rui-icon icon="pencil" />}
  />
```

Icon buttons can optionally enhance on a [breakpoint](/docs/foundation/breakpoints)
of your choice and display label once you know there is enough room for it.

📐 Try resizing your browser to see how label visibility changes.

```docoff-react-preview
  <Button
    label="Label always visible"
    labelVisibility="xs"
    beforeLabel={<rui-icon icon="pencil" />}
  />
  <Button
    label="Label visible from sm up"
    labelVisibility="sm"
    beforeLabel={<rui-icon icon="pencil" />}
  />
  <Button
    label="Label visible from md up"
    labelVisibility="md"
    beforeLabel={<rui-icon icon="pencil" />}
  />
  <Button
    label="Label visible from lg up"
    labelVisibility="lg"
    beforeLabel={<rui-icon icon="pencil" />}
  />
  <Button
    label="Label visible from xl up"
    labelVisibility="xl"
    beforeLabel={<rui-icon icon="pencil" />}
  />
```

## Buttons with Badges

A [Badge](/components/Badge) can be added to buttons to provide additional
information or to draw user's attention.

```docoff-react-preview
  <Button
    label="Badge before"
    beforeLabel={<Badge label={'3'} priority="outline" color="light" />}
  />
  <Button
    label="Badge before, on top"
    startCorner={<Badge label={'3'} />}
  />
  <Button
    label="Badge after, on top"
    endCorner={<Badge label={'3'} />}
    priority="outline"
  />
  <Button
    label="Badge after"
    afterLabel={<Badge label="new" color="warning" />}
    priority="outline"
  />
```

### Icon Buttons with a Badge

Badges play nicely with icon buttons, too:

```docoff-react-preview
<Button
  label="Icon button with badge"
  labelVisibility="none"
  priority="outline"
  beforeLabel={<rui-icon icon="warning-sign" />}
  startCorner={<Badge label={'3'} color="warning" />}
/>
<Button
  label="Icon button with badge"
  labelVisibility="md"
  priority="outline"
  beforeLabel={<rui-icon icon="warning-sign" />}
  startCorner={<Badge label={'3'} color="danger" />}
/>
```

## States

### Disabled State

Disabled state makes the action unavailable.

```docoff-react-preview
<Button label="Disabled filled button" disabled />
<Button label="Disabled outline button" priority="outline" disabled />
<Button label="Disabled flat button" priority="flat" disabled />
```

### Feedback State

When user's action triggers an asynchronous process on background, the button's
feedback state (not to be mistaken with
[feedback colors](/docs/foundation/colors#feedback-colors)) can be indicated by
showing an icon. The icon replaces button's label while retaining original
dimensions of the button. Buttons in feedback state are automatically disabled
to prevent unwanted interaction.

Filled buttons in feedback state:

```docoff-react-preview
<Button
  label="Success"
  color="success"
  feedbackIcon={<rui-icon icon="success" />}
/>
<Button
  label="Success"
  labelVisibility="none"
  color="success"
  feedbackIcon={<rui-icon icon="success" />}
  endCorner={<Badge color="danger" label={'3'} />}
/>
<docoff-placeholder dark inline>
  <Button
    label="Light"
    color="light"
    feedbackIcon={<rui-icon icon="success" />}
  />
</docoff-placeholder>
<Button
  label="Dark"
  color="dark"
  feedbackIcon={<rui-icon icon="success" />}
/>
<Button
  label="Primary"
  feedbackIcon={(
    <span className="d-inline-flex animation-spin-counterclockwise">
      <rui-icon icon="loading" />
    </span>
  )}
/>
```

Outline buttons in feedback state:

```docoff-react-preview
<Button
  label="Success"
  priority="outline"
  color="success"
  feedbackIcon={<rui-icon icon="success" />}
/>
<Button
  label="Success"
  labelVisibility="none"
  priority="outline"
  color="success"
  feedbackIcon={<rui-icon icon="success" />}
  endCorner={<Badge color="danger" label={'3'} />}
/>
<docoff-placeholder dark inline>
  <Button
    label="Light"
    priority="outline"
    color="light"
    feedbackIcon={<rui-icon icon="success" />}
  />
</docoff-placeholder>
<Button
  label="Dark"
  priority="outline"
  color="dark"
  feedbackIcon={<rui-icon icon="success" />}
/>
<Button
  label="Primary"
  priority="outline"
  feedbackIcon={(
    <span className="d-inline-flex animation-spin-counterclockwise">
      <rui-icon icon="loading" />
    </span>
  )}
/>
```

Flat buttons in feedback state:

```docoff-react-preview
<Button
  label="Success"
  priority="flat"
  color="success"
  feedbackIcon={<rui-icon icon="success" />}
/>
<Button
  label="Success"
  labelVisibility="none"
  priority="flat"
  color="success"
  feedbackIcon={<rui-icon icon="success" />}
  endCorner={<Badge color="danger" label={'3'} />}
/>
<docoff-placeholder dark inline>
  <Button
    label="Light"
    priority="flat"
    color="light"
    feedbackIcon={<rui-icon icon="success" />}
  />
</docoff-placeholder>
<Button
  label="Dark"
  priority="flat"
  color="dark"
  feedbackIcon={<rui-icon icon="success" />}
/>
<Button
  label="Primary"
  priority="flat"
  feedbackIcon={(
    <span className="d-inline-flex animation-spin-counterclockwise">
      <rui-icon icon="loading" />
    </span>
  )}
/>
```

👉 Visit the [CSS Helpers](/docs/css-helpers/animation) section to see how the icon
animation is made.

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't
interfere with the API of the React component and that aren't filtered out by
[`transferProps`](/docs/js-helpers/transferProps) helper are forwarded to the
root `<button>` HTML element. This enables making the component interactive and
helps to improve its accessibility.

👉 For the full list of supported attributes refer to:

- [`<button>` HTML element attributes][button-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}

## Forwarding ref

If you provide [ref], it is forwarded to the native HTML `<button>` element.

## API

<docoff-react-props src="/components/Button/Button.jsx"></docoff-react-props>

## Theming

### Common Theming Options

| Custom Property                | Description                                  |
|--------------------------------|----------------------------------------------|
| `--rui-Button__font-weight`    | Font weight                                  |
| `--rui-Button__text-transform` | Text transform, e.g. uppercase or small-caps |
| `--rui-Button__letter-spacing` | Spacing between letters                      |
| `--rui-Button__border-width`   | Border width                                 |
| `--rui-Button__border-radius`  | Corner radius                                |

### Theming Priorities and Color Variants

It's possible to adjust the theme for specific priority, color variant, and
state. Naming convention looks as follows:

`--rui-Button--<PRIORITY>--<COLOR>--<INTERACTION STATE>__<PROPERTY>`

Where:

- `<PRIORITY>` is one of `filled`, `outline`, or `flat` (see
  [Priorities](#priorities) and [API](#api)),
- `<COLOR>` is a value from supported
  [color collections](/docs/foundation/collections#colors)
  (check color variants of [each priority](#priorities) and [API](#api) to see
  which collections are supported),
- `<INTERACTION STATE>` is one of `default`, `hover`, `active`, or `disabled`
  (the last one being optional),
- `<PROPERTY>` is one of:
    - `color`, `border-color`, `background`, or `box-shadow` for the `filled`
      priority,
    - `color`, `border-color`, or `background` for the `outline` priority,
    - `color` or `background` for the `flat` priority.

### Theming Sizes

Available sizes can be adjusted as follows:

`--rui-Button--<SIZE>__<PROPERTY>`

Where:

- `<SIZE>` is one of `small`, `medium`, or `large` (see [Sizes](#sizes) and
  [API](#api))
- `<PROPERTY>` is one of `height`, `padding-x`, `padding-y`, or `font-size`

👉 Button sizes are linked to
[box field sizes](/docs/customize/theming/forms#box-field-sizes) sizes so they align
nicely when placed in row.

### Example Theme

```docoff-react-preview
<style type="text/css">
  {`
  .example {
    margin: 0;
  }

  .example > * {
    margin: 4px;
  }

  .example--themed-buttons {
    --rui-Button__font-weight: bold;
    --rui-Button__letter-spacing: 0.05em;
    --rui-Button__text-transform: uppercase;
    --rui-Button__border-radius: 0;
    --rui-Button--filled--primary--default__box-shadow:
      0.1em 0.1em 0.5em rgba(0, 0, 0, 0.3);
    --rui-Button--medium__height: 3rem;
    --rui-Button--medium__padding-x: 1.25rem;
    --rui-Button--medium__padding-y: 0.25rem;
  }
  `}
</style>
<Button label="Default filled button" />
<Button label="Default outline button" priority="outline" />
<div className="example example--themed-buttons">
  <Button label="Themed filled button" />
  <Button label="Themed outline button" priority="outline" />
</div>
```

### Theming Disabled State

The `disabled` state offers a bit more of design flexibility compared to other
interaction states. Firstly, there are a few common options for this state:

| Custom Property                   | Description                                 |
|-----------------------------------|---------------------------------------------|
| `--rui-Button--disabled__opacity` | Opacity of disabled buttons                 |
| `--rui-Button--disabled__cursor`  | Cursor to show on hovering disabled buttons |

Secondly, it can be further adjusted using priority and color variant specific
options for the disabled state:

`--rui-Button--<PRIORITY>--<COLOR>--disabled__<PROPERTY>`

Undefined theming options are inherited from the `default` interaction state.

Example:

```docoff-react-preview
<style type="text/css">
  {`
  .example {
    margin: 0;
  }

  .example > * {
    margin: 4px;
  }

  .example--themed-disabled-buttons {
    --rui-Button__border-radius: 0;
    --rui-Button--disabled__opacity: 0.4;
    --rui-Button--disabled__cursor: default;
    --rui-Button--filled--primary--disabled__color: slate;
    --rui-Button--filled--primary--disabled__border-color: silver;
    --rui-Button--filled--primary--disabled__background: silver;
    --rui-Button--filled--success--disabled__color: slate;
    --rui-Button--filled--success--disabled__border-color: silver;
    --rui-Button--filled--success--disabled__background: silver;
    --rui-Button--outline--primary--disabled__color: slate;
    --rui-Button--outline--primary--disabled__border-color: silver;
  }
  `}
</style>
<Button
  label="Default filled primary button, disabled"
  disabled
/>
<Button
  label="Default filled success button, disabled"
  color="success"
  disabled
/>
<Button
  label="Default outline primary button, disabled"
  priority="outline"
  disabled
/>
<div className="example example--themed-disabled-buttons">
  <Button
    label="Themed filled primary button, disabled"
    disabled
  />
  <Button
    label="Themed filled success button, disabled"
    color="success"
    disabled
  />
  <Button
    label="Themed outline primary button, disabled"
    priority="outline"
    disabled
  />
</div>
```

### Theming Feedback State

Similarly to disabled state, opacity and cursor can be set for buttons in
feedback state.

| Custom Property                   | Description                                          |
|-----------------------------------|------------------------------------------------------|
| `--rui-Button--feedback__opacity` | Opacity of buttons in feedback state                 |
| `--rui-Button--feedback__cursor`  | Cursor to show on hovering buttons in feedback state |

[button-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
[ref]: https://reactjs.org/docs/refs-and-the-dom.html
