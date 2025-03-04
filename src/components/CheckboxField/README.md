# CheckboxField

CheckboxField allows users to select one or more options from a set.

## Basic Usage

To implement the CheckboxField component, you need to import it first:

```js
import { CheckboxField } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
React.createElement(() => {
  const [agree, setAgree] = React.useState(true);
  return (
    <CheckboxField
      checked={agree}
      label={(
          <>
            I have read and agree with
            {' '}
            <TextLink href="#" label="terms and conditions" />
          </>
        )}
      onChange={() => setAgree(!agree)}
    />
  );
});
```

See [API](#api) for all available options.

## General Guidelines

- Use the CheckboxField when there are lists of options and the user may
  **select any number of choices,** including zero, one, or several. For
  selecting just a single option from the list, use either the
  [Radio](/components/Radio) or [SelectField](/components/SelectField)
  component.

- Use the CheckboxField for boolean (true/false) input **in forms that require
  to be confirmed** by a button to become active. To toggle things on or off
  with an immediate effect (without confirmation), use rather the
  [Toggle](/components/Toggle) component.

- **Use positive wording for the checkbox label,** so that it's clear what will
  happen when the user turns on the checkbox. Avoid negations such as “Don't
  send me any emails” which would mean that the user needs to turn the
  checkbox **on** in order for something **not** to happen.

- **Use text labels** unless it is necessary to wrap text label into
  Popover-like to component to provide additional info about the field.

- Only make the CheckboxField's label invisible when there is **another visual
  clue** to guide users through toggling the input.

- When a short label is not enough, use **help texts to guide users** before
  they enter anything.

- Use **clear, calm error messages** when there's a problem with what they
  entered.

- **Visually present groups of choices as groups,** and clearly separate them
  from other groups on the same page.

📖 [Read more about checkboxes and radios at Nielsen Norman Group.](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)

## Help Text

You may provide an additional help text to clarify what will be the impact of
turning the checkbox on or off.

```docoff-react-preview
React.createElement(() => {
  const [getNewsletter, setGetNewsletter] = React.useState(true);
  return (
    <CheckboxField
      checked={getNewsletter}
      helpText="We will not bother you more than once a month, we promise!"
      label="Send me newsletter"
      onChange={() => setGetNewsletter(!getNewsletter)}
    />
  );
});
```

## Label Options

In some cases, it may be convenient to visually hide the checkbox label. The
label remains accessible to assistive technologies.

```docoff-react-preview
React.createElement(() => {
  const [checked, setChecked] = React.useState(true);
  return (
    <CheckboxField
      checked={checked}
      isLabelVisible={false}
      label="You cannot see this"
      onChange={() => setChecked(!checked)}
    />
  );
});
```

It's also possible to display label before input:

```docoff-react-preview
React.createElement(() => {
  const [checked, setChecked] = React.useState(true);
  return (
    <CheckboxField
      checked={checked}
      label="Label precedes input"
      labelPosition="before"
      onChange={() => setChecked(!checked)}
    />
  );
});
```

## States

### Validation States

Validation states visually present the result of validation of the input. You
should always **provide validation message for states other than valid** so
users know what happened and what action they should take or what options they
have.

```docoff-react-preview
React.createElement(() => {
  const [agree, setAgree] = React.useState(true);
  return (
    <>
      <CheckboxField
        checked={agree}
        label={(
          <>
            I have read and agree with
            {' '}
            <TextLink href="#" label="terms and conditions" />
          </>
        )}
        onChange={() => setAgree(!agree)}
        validationState="valid"
      />
      <CheckboxField
        checked={agree}
        label={(
          <>
            I have read and agree with
            {' '}
            <TextLink href="#" label="terms and conditions" />
          </>
        )}
        onChange={() => setAgree(!agree)}
        validationState="warning"
        validationText={(
          <>
            Please wait 10 minutes until we verify your data.
            {' '}
            <TextLink href="#" label="Cancel" />
          </>
        )}
      />
      <CheckboxField
        checked={agree}
        label={(
          <>
            I have read and agree with
            {' '}
            <TextLink href="#" label="terms and conditions" />
          </>
        )}
        onChange={() => setAgree(!agree)}
        required
        validationState="invalid"
        validationText="You must agree to be able to proceed."
      />
    </>
  );
});
```

### Required State

The required state indicates that the input is mandatory. Required fields
display an asterisk `*` after the label by default.

```docoff-react-preview
React.createElement(() => {
  const [agree, setAgree] = React.useState(true);
  return (
    <CheckboxField
      checked={agree}
      label="I agree"
      onChange={() => setAgree(!agree)}
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
        <CheckboxField
          checked={optional}
          label="This field is optional"
          onChange={() => setOptional(!optional)}
        />
        <CheckboxField
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
<CheckboxField
  disabled
  label="Disabled checkbox"
/>
<CheckboxField
  checked
  disabled
  label="Disabled checkbox, checked"
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

<docoff-react-props src="/components/CheckboxField/CheckboxField.jsx"></docoff-react-props>

## Theming

Head to [Forms Theming](/docs/customize/theming/forms) to see shared form theming
options. On top of that, the following options are available for CheckboxField.

| Custom Property                                                      | Description                                  |
|----------------------------------------------------------------------|----------------------------------------------|
| `--rui-FormField--check__input--checkbox__border-radius`             | Input corner radius                          |
| `--rui-FormField--check__input--checkbox--checked__background-image` | Background image of checked input            |

[checkbox-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#additional_attributes
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
[ref]: https://reactjs.org/docs/refs-and-the-dom.html
