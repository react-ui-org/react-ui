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

- **Use text labels** unless it is necessary to wrap text label into
  Popover-like to component to provide additional info about the field.

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
        validationText={(
          <>
            Please
            {' '}
            <TextLink href="#" label="upgrade your plan" />
            {' '}
            to make this option available.
          </>
        )}
      />
    </>
  );
});
```

### Required State

The required state indicates that the input is mandatory.

```docoff-react-preview
React.createElement(() => {
  const [studioQuality, setStudioQuality] = React.useState(true);
  return (
    <Toggle
      checked={studioQuality}
      label="Listen in studio quality"
      onChange={() => setStudioQuality(!studioQuality)}
      required
    />
  );
});
```

#### Styling the Required State

All form fields in React UI can be
[styled](/docs/customize/theming/forms/#required-state)
to indicate the required state.

However, you may find yourself in a situation where a form field is valid in
both checked and unchecked states, for example to turn on or off a feature.
If your project uses the label color as the primary means to indicate the
required state of input fields and the usual asterisk `*` is omitted, you may
want to keep the label color consistent for both states to avoid confusion.

For this edge case, there is the `renderAsRequired` prop:

```docoff-react-preview
React.createElement(() => {
  const [optional, setOptional] = React.useState(false);
  const [renderAsRequired, setRenderAsRequired] = React.useState(false);
  return (
    <React.Fragment>
      <style>
      {`
        .example {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem 0.5rem;
        }

        .example--themed-form-fields {
          --rui-FormField__label__color: var(--rui-color-text-secondary);
          --rui-FormField--required__label__color: var(--rui-color-text-primary);
          --rui-FormField--required__sign: '';
        }
      `}
      </style>
      <div class="example example--themed-form-fields">
       <Toggle
          checked={optional}
          label="This field is optional"
          onChange={() => setOptional(!optional)}
        />
        <Toggle
          checked={renderAsRequired}
          label="This field is optional but looks like required"
          onChange={() => setRenderAsRequired(!renderAsRequired)}
          renderAsRequired
        />
      </div>
    </React.Fragment>
  );
});
```

It renders the field as if it was required, but doesn't add the `required`
attribute to the actual input.

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
can specify **any HTML attribute you like.** All attributes that don't
interfere with the API of the React component and that aren't filtered out by
[`transferProps`](/docs/js-helpers/transferProps) helper are forwarded to the
`<input>` HTML element. This enables making the component interactive and helps
to improve its accessibility.

👉 For the full list of supported attributes refer to:

- [`<input type="checkbox" />` HTML element attributes][checkbox-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}

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

[checkbox-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#additional_attributes
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
[ref]: https://reactjs.org/docs/refs-and-the-dom.html
