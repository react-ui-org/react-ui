# ButtonGroup

ButtonGroup visually groups related buttons together.

## Basic Usage

To implement the ButtonGroup component, you need to import it first:

```js
import { ButtonGroup } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<ButtonGroup>
  <Button label="Week" />
  <Button label="Month" />
  <Button label="Year" />
</ButtonGroup>
```

See [API](#api) for all available options.

## General Guidelines

- Use button group to group **related actions** that a user can take. Buttons
  should not be grouped just to save space on the screen.

- **Mixing multiple button priorities** and some other properties within a
  button group is [not allowed](#shared-properties). The priority can only be
  set for all buttons in the group at once.

- In most use cases, **secondary action color** is probably the best option for
  buttons in a group as it works good with the colors of the selected state.

- Use **short labels or icons** so the buttons can fit small screens.

- For toggling between on/off states, use rather the
  [Toggle](/components/Toggle) component.

- For switching between options in a form that needs to be submitted, use rather
  the [SelectField](/components/SelectField) or
  [Radio](/components/Radio) components.

- In the background, ButtonGroup uses the [`fieldset`][fieldset] element. Not
  only it improves the [accessibility] of the group, it also allows you to make
  use of its built-in features like disabling all nested inputs or pairing the
  group with a form outside. Consult [the MDN docs][fieldset] to learn more.

- Be careful with using `startCorner` and `endCorner` options for grouped
  buttons. Overflowing elements may cause undesired interaction problems.

### Shared Properties

You can set the following properties directly on ButtonGroup to be shared for
all buttons inside the group:

- `size`,
- `priority`,
- `disabled` state,
- and `block` width.

These properties are then passed over to individual buttons. At the same time,
they **cannot be overridden** on the buttons' level. While (in theory)
technically possible, from the design point of view it's undesirable to group
buttons of totally different types or sizes.

## Priorities

There are three **visual priorities** of buttons which exactly copy the
priorities of the [Button](/components/Button/) component:

1. filled
2. outline
3. flat

👉 To avoid undesired combinations, the visual priority of the button group
**cannot be overridden** on the Button level.

### Filled

The default, high-emphasis priority should be used for primary actions of your
app.

```docoff-react-preview
<ButtonGroup>
  <Button color="secondary" label="Week" />
  <Button color="secondary" label="Month" />
  <Button color="secondary" label="Year" />
</ButtonGroup>
```

### Outline

Medium-emphasis buttons to contain actions that are important but not primary
in your app.

```docoff-react-preview
<ButtonGroup priority="outline">
  <Button color="secondary" label="Week" />
  <Button color="secondary" label="Month" />
  <Button color="secondary" label="Year" />
</ButtonGroup>
```

### Flat

Flat buttons are designed for less pronounced actions to help maintain focus on
the content.

```docoff-react-preview
<ButtonGroup priority="flat">
  <Button color="secondary" label="Week" />
  <Button color="secondary" label="Month" />
  <Button color="secondary" label="Year" />
</ButtonGroup>
```

## Sizes

All existing button sizes are also available on the button group level: small,
medium, and large.

```docoff-react-preview
<ButtonGroup size="small">
  <Button color="secondary" label="Week" />
  <Button color="secondary" label="Month" />
  <Button color="secondary" label="Year" />
</ButtonGroup>
<ButtonGroup>
  <Button color="secondary" label="Week" />
  <Button color="secondary" label="Month" />
  <Button color="secondary" label="Year" />
</ButtonGroup>
<ButtonGroup size="large">
  <Button color="secondary" label="Week" />
  <Button color="secondary" label="Month" />
  <Button color="secondary" label="Year" />
</ButtonGroup>
```

Block button groups span the full width of a parent:

```docoff-react-preview
<ButtonGroup block>
  <Button color="secondary" label="Week" />
  <Button color="secondary" label="Month" />
  <Button color="secondary" label="Year" />
</ButtonGroup>
```

## States

### Disabled State

Disables all buttons inside the group.

```docoff-react-preview
<ButtonGroup disabled>
  <Button color="secondary" label="Week" />
  <Button color="secondary" label="Month" />
  <Button color="secondary" label="Year" />
</ButtonGroup>
<ButtonGroup priority="outline" disabled>
  <Button color="secondary" label="Week" />
  <Button color="secondary" label="Month" />
  <Button color="secondary" label="Year" />
</ButtonGroup>
<ButtonGroup priority="flat" disabled>
  <Button color="secondary" label="Week" />
  <Button color="secondary" label="Month" />
  <Button color="secondary" label="Year" />
</ButtonGroup>
```

### Feedback State

When user's action triggers an asynchronous process on background, feedback
state of individual buttons can be indicated by showing an icon.

```docoff-react-preview
<ButtonGroup>
  <Button
    color="success"
    label="Week"
    feedbackIcon={<rui-icon icon="success" />}
  />
  <Button color="secondary"label="Month" />
  <Button color="secondary"label="Year" />
</ButtonGroup>
<ButtonGroup priority="outline">
  <Button
    color="success"
    label="Week"
    feedbackIcon={<rui-icon icon="success" />}
  />
  <Button color="secondary"label="Month" />
  <Button color="secondary"label="Year" />
</ButtonGroup>
<ButtonGroup priority="flat">
  <Button
    color="success"
    label="Week"
    feedbackIcon={<rui-icon icon="success" />}
  />
  <Button color="secondary"label="Month" />
  <Button color="secondary"label="Year" />
</ButtonGroup>
```

### Selected State

To highlight the selected option, just apply the selected color variant for
the desired item.

```docoff-react-preview
<ButtonGroup>
  <Button color="selected" label="Week" />
  <Button color="secondary" label="Month" />
  <Button color="secondary" label="Year" />
</ButtonGroup>
<ButtonGroup priority="outline">
  <Button color="selected" label="Week" />
  <Button color="secondary" label="Month" />
  <Button color="secondary" label="Year" />
</ButtonGroup>
<ButtonGroup priority="flat">
  <Button color="selected" label="Week" />
  <Button color="secondary" label="Month" />
  <Button color="secondary" label="Year" />
</ButtonGroup>
```

## Accessibility

You can improve the accessibility of your ButtonGroup by linking it to a label
and communicating the state of individual options.

```docoff-react-preview
<span id="period-label">Period:</span>
<ButtonGroup aria-labelledby="period-label">
  <Button color="selected" label="Week" aria-pressed />
  <Button color="secondary" label="Month" aria-pressed={false} />
  <Button color="secondary" label="Year" aria-pressed={false} />
</ButtonGroup>
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't interfere
with the API of the React component are forwarded to the root `<div>` HTML
element. This enables making the component interactive and helps to improve
its accessibility.

👉 For the full list of supported attributes refer to:

- [`<div>` HTML element attributes][div-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}

## API

<docoff-react-props src="/components/ButtonGroup/ButtonGroup.jsx"></docoff-react-props>

## Theming

| Custom Property                                                    | Description                                    |
|--------------------------------------------------------------------|------------------------------------------------|
| `--rui-ButtonGroup__inner-border-radius`                           | Inner border radius of buttons                 |
| `--rui-ButtonGroup--filled__gap`                                   | Gap between `filled` buttons                   |
| `--rui-ButtonGroup--filled__separator__width`                      | Separator width for `filled` buttons           |
| `--rui-ButtonGroup--filled__separator__color`                      | Separator color for `filled` buttons           |
| `--rui-ButtonGroup--outline__gap`                                  | Gap between `outline` buttons                  |
| `--rui-ButtonGroup--outline__separator__width`                     | Separator width for `outline` buttons          |
| `--rui-ButtonGroup--outline__separator__color`                     | Separator color for `outline` buttons          |
| `--rui-ButtonGroup--flat__gap`                                     | Gap between `flat` buttons                     |
| `--rui-ButtonGroup--flat__separator__width`                        | Separator width for `flat` buttons             |
| `--rui-ButtonGroup--flat__separator__color`                        | Separator color for `flat` buttons             |

[accessibility]: https://www.w3.org/WAI/tutorials/forms/grouping/
[div-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div#attributes
[fieldset]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
