# Toggle

Toggle switches things on and off.

## Basic Usage

To implement the Toggle component, you need to import it first:

```js
import { Toggle } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
React.createElement(() => {
  const [studioQuality, setStudioQuality] = React.useState(true);
  return (
    <Toggle
      checked={studioQuality}
      label="Listen in studio quality"
      onChange={() => setStudioQuality(!studioQuality)}
    />
  );
});
```

See [API](#api) for all available options.

## General Guidelines

- Use the toggle only for boolean (true/false) input **with an immediate effect
  (without confirmation)**. To toggle things on or off in forms that require to
  be submitted by a button, use rather the
  [CheckboxField](/components/CheckboxField) component.

- **Use positive wording for the toggle label,** so that it's clear what will
  happen when the user turns on the toggle. Avoid negations such as “Don't send
  me any emails” which would mean that the user needs to turn the toggle **on**
  in order for something **not** to happen.

- Only make the Toggle's label invisible when there is **another visual clue**
  to guide users through using the input.

- When a short label is not enough, use **help texts to guide users** before
  they enter anything.

- Use **clear, calm error messages** when there's a problem with what they
  entered.

- The toggle is designed for **switching things on and off.** Don't use it to
  switch between two different things that cannot be described as on or off
  using a single label, e.g. different viewing modes. In such cases, consider
  using the [ButtonGroup](/components/ButtonGroup) component.

## Help Text

You may provide an additional help text to clarify what will be the impact of
turning the toggle on or off.

```docoff-react-preview
React.createElement(() => {
  const [studioQuality, setStudioQuality] = React.useState(true);
  return (
    <Toggle
      checked={studioQuality}
      helpText={
        'Unrivaled audio quality. Uses the MQA audio format. '
        + 'Transfers a lot of data.'
      }
      label="Listen in studio quality"
      onChange={() => setStudioQuality(!studioQuality)}
    />
  );
});
```

## Label Options

In some cases, it may be convenient to visually hide the toggle label. The label
remains accessible to assistive technologies.

```docoff-react-preview
React.createElement(() => {
  const [studioQuality, setStudioQuality] = React.useState(true);
  return (
    <Toggle
      checked={studioQuality}
      isLabelVisible={false}
      label="You cannot see this"
      onChange={() => setStudioQuality(!studioQuality)}
    />
  );
});
```

It's also possible to display the label before the input:

```docoff-react-preview
React.createElement(() => {
  const [studioQuality, setStudioQuality] = React.useState(true);
  return (
    <Toggle
      checked={studioQuality}
      label="Listen in studio quality"
      labelPosition="before"
      onChange={() => setStudioQuality(!studioQuality)}
    />
  );
});
```

## States

### Validation States

Validation states visually present the result of validation of the input. You
should always **provide a validation message for states other than valid** so
users know what happened and what action they should take or what options they
have.

```docoff-react-preview
React.createElement(() => {
  const [studioQuality, setStudioQuality] = React.useState(true);
  return (
    <>
      <Toggle
        checked={studioQuality}
        label="Listen in studio quality"
        onChange={() => setStudioQuality(!studioQuality)}
        validationState="valid"
      />
      <Toggle
        checked={studioQuality}
        label="Listen in studio quality"
        onChange={() => setStudioQuality(!studioQuality)}
        validationState="warning"
        validationText={
          'Looks like you are connected over cellular network. '
          + 'Please make sure you know what you are doing.'
        }
      />
      <Toggle
        checked={studioQuality}
        label="Listen in studio quality"
        onChange={() => setStudioQuality(!studioQuality)}
        validationState="invalid"
        validationText="Please upgrade your plan to make this option available."
      />
    </>
  );
});
```

### Disabled State

Disabled state makes the input unavailable.

```docoff-react-preview
<Toggle label="Disabled toggle" disabled />
<Toggle
  label="Disabled toggle, checked"
  disabled
  checked
/>
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify [React synthetic events] or you can **add whatever HTML attribute
you like.** All attributes that don't interfere with the API are forwarded to
the native HTML `<input>`. This enables making the component interactive and
helps to improve its accessibility.

👉 Refer to the MDN reference for the full list of supported attributes of the
[checkbox] input type.

## Forwarding ref

If you provide [ref], it is forwarded to the native HTML `<input>` element.

## API

<docoff-react-props src="/components/Toggle/Toggle.jsx"></docoff-react-props>

## Theming

Head to [Forms Theming](/docs/customize/theming/forms) to see shared form theming
options. On top of that, the following options are available for Toggle.

| Custom Property                                                    | Description                                    |
|--------------------------------------------------------------------|------------------------------------------------|
| `--rui-FormField--check__input--toggle__width`             | Input width (height is shared with other check fields) |
| `--rui-FormField--check__input--toggle__border-radius`             | Input corner radius                            |
| `--rui-FormField--check__input--toggle__background-size`           | Input background size                          |
| `--rui-FormField--check__input--toggle--default__background-image` | Background image of unchecked input            |
| `--rui-FormField--check__input--toggle--default__background-position` | Background position of unchecked input      |
| `--rui-FormField--check__input--toggle--checked__background-image` | Background image of checked input              |
| `--rui-FormField--check__input--toggle--checked__background-position` | Background position of checked input        |

[React synthetic events]: https://reactjs.org/docs/events.html
[checkbox]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#additional_attributes
[ref]: https://reactjs.org/docs/refs-and-the-dom.html
