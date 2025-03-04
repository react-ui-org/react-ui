# SelectField

SelectField allows users to select one option from a set.

## Basic Usage

To implement the SelectField component, you need to import it first:

```js
import { SelectField } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
React.createElement(() => {
  const [fruit, setFruit] = React.useState('apple');
  return (
    <SelectField
      label="Your favourite fruit"
      onChange={(e) => setFruit(e.target.value)}
      options={[
        {
          label: 'Apple',
          value: 'apple',
        },
        {
          label: 'Banana',
          value: 'banana',
        },
        {
          label: 'Grapefruit',
          value: 'grapefruit',
        },
      ]}
      value={fruit}
    />
  );
});
```

See [API](#api) for all available options.

## General Guidelines

- Use SelectField for **many options**. For sets of just a few options
  (say 3 at maximum) consider using the [Radio](/components/Radio) component.
  This will help keep your UI clean and uncluttered and prevent your users from
  being overwhelmed by too many options.

- **Don't use for boolean** (true/false) selection or to toggle things on and
  off. [CheckboxField](/components/CheckboxField) and
  [Toggle](/components/Toggle) are more suitable for such cases.

- Use **short and descriptive labels**, ideally nouns rather than seemingly
  polite phrases like _Please select your favourite fruit_. Short labels will
  help your users accomplish their task faster.

- **Use text labels** unless it is necessary to wrap text label into
  Popover-like to component to provide additional info about the field.

- Only make the SelectField's label invisible when there is **another visual
  clue** to guide users through filling the input. Using the first option as
  label is not recommended either — it disappears once user makes their choice.

- When a short label is not enough, use **help texts to guide users** before
  they enter anything.

- Use **clear, calm error messages** when there's a problem with what they
  entered.

- In case of a large amount of options, consider **grouping related items
  together** by nesting them.

👉 We use the **native `select`** HTML element to improve user experience on
mobile devices by using the native select of the platform.

## Design Variants

To satisfy the design requirements of your project, all input fields in React UI
come in two design variants to choose from: outline and filled. Both can be
further [customized](#theming) with CSS custom properties.

```docoff-react-preview
React.createElement(() => {
  const [fruit, setFruit] = React.useState('apple');
  const options = [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Banana',
      value: 'banana',
    },
    {
      label: 'Grapefruit',
      value: 'grapefruit',
    },
  ];
  return (
    <>
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
      />
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        variant="filled"
        value={fruit}
      />
    </>
  );
});
```

## Sizes

Aside from the default (medium) size, two additional sizes are available: small
and large.

```docoff-react-preview
React.createElement(() => {
  const [fruit, setFruit] = React.useState('apple');
  const options = [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Banana',
      value: 'banana',
    },
    {
      label: 'Grapefruit',
      value: 'grapefruit',
    },
  ];
  return (
    <>
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        size="small"
        value={fruit}
      />
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
      />
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        size="large"
        value={fruit}
      />
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        size="small"
        value={fruit}
        variant="filled"
      />
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
        variant="filled"
      />
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        size="large"
        value={fruit}
        variant="filled"
      />
    </>
  );
});
```

Full-width fields span the full width of a parent:

```docoff-react-preview
React.createElement(() => {
  const [fruit, setFruit] = React.useState('apple');
  const options = [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Banana',
      value: 'banana',
    },
    {
      label: 'Grapefruit',
      value: 'grapefruit',
    },
  ];
  return (
    <>
      <SelectField
        fullWidth
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
      />
      <SelectField
        fullWidth
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
        variant="filled"
      />
    </>
  );
});
```

## Grouping Related Options

For a large amount of options you can group related items together by nesting
them (implements the `optgroup` HTML element).

```docoff-react-preview
React.createElement(() => {
  const [crop, setCrop] = React.useState('apple');
  const options = [
    {
      label: 'Fruits',
      options: [
        {
          label: 'Apple',
          value: 'apple',
        },
        {
          label: 'Banana',
          value: 'banana',
        },
        {
          label: 'Grapefruit',
          value: 'grapefruit',
        },
      ],
    },
    {
      label: 'Vegetables',
      options: [
        {
          label: 'Beetroot',
          value: 'beetroot',
        },
        {
          label: 'Carrot',
          value: 'carrot',
        },
        {
          label: 'Tomato',
          value: 'tomato',
        },
      ],
    },
  ];
  return (
    <>
      <SelectField
        label="Your favourite crop"
        onChange={(e) => setCrop(e.target.value)}
        options={options}
        value={crop}
      />
      <SelectField
        label="Your favourite crop"
        onChange={(e) => setCrop(e.target.value)}
        options={options}
        value={crop}
        variant="filled"
      />
    </>
  );
});
```

## Invisible Label

While it may be acceptable for login screens with just a few fields or for other
simple forms, it's dangerous to hide labels from users in most cases. Keep in
mind you should **provide another visual clue** so users know what to fill into
the input.

```docoff-react-preview
React.createElement(() => {
  const [fruit, setFruit] = React.useState('apple');
  const options = [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Banana',
      value: 'banana',
    },
    {
      label: 'Grapefruit',
      value: 'grapefruit',
    },
  ];
  return (
    <>
      <SelectField
        isLabelVisible={false}
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
      />
      <SelectField
        isLabelVisible={false}
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
        variant="filled"
      />
    </>
  );
});
```

## Horizontal Layout

The default vertical layout is very easy to use and work with. However, there
are situations where horizontal layout suits better — and that's why React UI
supports this kind of layout as well.

```docoff-react-preview
React.createElement(() => {
  const [fruit, setFruit] = React.useState('apple');
  const options = [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Banana',
      value: 'banana',
    },
    {
      label: 'Grapefruit',
      value: 'grapefruit',
    },
  ];
  return (
    <>
      <SelectField
        label="Your favourite fruit"
        layout="horizontal"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
      />
      <SelectField
        label="Your favourite fruit"
        layout="horizontal"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
        variant="filled"
      />
      <SelectField
        fullWidth
        label="Your favourite fruit"
        layout="horizontal"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
      />
      <SelectField
        fullWidth
        label="Your favourite fruit"
        layout="horizontal"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
        variant="filled"
      />
      <SelectField
        fullWidth
        isLabelVisible={false}
        label="Your favourite fruit"
        layout="horizontal"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
      />
      <SelectField
        fullWidth
        isLabelVisible={false}
        label="Your favourite fruit"
        layout="horizontal"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
        variant="filled"
      />
    </>
  );
});
```

## Help Text

You may provide an additional help text to clarify how the input should be
filled.

```docoff-react-preview
React.createElement(() => {
  const [fruit, setFruit] = React.useState('apple');
  const options = [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Banana',
      value: 'banana',
    },
    {
      label: 'Grapefruit',
      value: 'grapefruit',
    },
  ];
  return (
    <>
      <SelectField
        helpText="Choose one or more kinds of fruit to feel happy."
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
      />
      <SelectField
        helpText="Choose one or more kinds of fruit to feel happy."
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
        variant="filled"
      />
      <SelectField
        helpText="Choose one or more kinds of fruit to feel happy."
        label="Your favourite fruit"
        layout="horizontal"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
      />
      <SelectField
        helpText="Choose one or more kinds of fruit to feel happy."
        label="Your favourite fruit"
        layout="horizontal"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
        variant="filled"
      />
      <SelectField
        fullWidth
        helpText="Choose one or more kinds of fruit to feel happy."
        label="Your favourite fruit"
        layout="horizontal"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
      />
      <SelectField
        fullWidth
        helpText="Choose one or more kinds of fruit to feel happy."
        label="Your favourite fruit"
        layout="horizontal"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
        variant="filled"
      />
    </>
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
  const [fruit, setFruit] = React.useState('apple');
  const options = [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Banana',
      value: 'banana',
    },
    {
      label: 'Grapefruit',
      value: 'grapefruit',
    },
  ];
  return (
    <>
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        required
        validationState="valid"
        validationText="Great, they're in stock!"
        value={fruit}
      />
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        required
        validationState="warning"
        validationText="Oh, really?"
        value={fruit}
      />
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        required
        validationState="invalid"
        validationText="You must select at least one kind of fruit."
        value={fruit}
      />
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        required
        validationState="valid"
        validationText="Great, they're in stock!"
        value={fruit}
        variant="filled"
      />
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        required
        validationState="warning"
        validationText="Oh, really?"
        value={fruit}
        variant="filled"
      />
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        required
        value={fruit}
        validationState="invalid"
        validationText="You must select at least one kind of fruit."
        variant="filled"
      />
    </>
  );
})
```

### Required State

The required state indicates that the input is mandatory.

```docoff-react-preview
React.createElement(() => {
  const [fruit, setFruit] = React.useState('apple');
  return (
    <SelectField
      label="Your favourite fruit"
      onChange={(e) => setFruit(e.target.value)}
      options={[
        {
          label: 'Apple',
          value: 'apple',
        },
        {
          label: 'Banana',
          value: 'banana',
        },
        {
          label: 'Grapefruit',
          value: 'grapefruit',
        },
      ]}
      value={fruit}
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
both selected and unselected states, for example to turn on or off a feature.
If your project uses the label color as the primary means to indicate the
required state of input fields and the usual asterisk `*` is omitted, you may
want to keep the label color consistent for both states to avoid confusion.

For this edge case, there is the `renderAsRequired` prop:

```docoff-react-preview
React.createElement(() => {
  const [fruit, setFruit] = React.useState('apple');
  const options = [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Banana',
      value: 'banana',
    },
    {
      label: 'Grapefruit',
      value: 'grapefruit',
    },
  ];
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
      <SelectField
          label="This field is optional"
          onChange={(e) => setFruit(e.target.value)}
          options={options}
          value={fruit}
        />
        <SelectField
          label="This field is optional but looks like required"
          onChange={(e) => setFruit(e.target.value)}
          options={options}
          value={fruit}
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

It's possible to disable just some options or the whole input.

```docoff-react-preview
React.createElement(() => {
  const [fruit, setFruit] = React.useState('apple');
  const options = [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      disabled: true,
      label: 'Banana',
      value: 'banana',
    },
    {
      label: 'Grapefruit',
      value: 'grapefruit',
    },
  ];
  return (
    <>
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
      />
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
        variant="filled"
      />
      <SelectField
        disabled
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value="apple"
      />
      <SelectField
        disabled
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value="apple"
        variant="filled"
      />
    </>
  );
})
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't
interfere with the API of the React component and that aren't filtered out by
[`transferProps`](/docs/js-helpers/transferProps) helper are forwarded to the
`<select>` HTML element. This enables making the component interactive and
helps to improve its accessibility.

👉 For the full list of supported attributes refer to:

- [`<select>` HTML element attributes][select-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}

## Forwarding ref

If you provide [ref], it is forwarded to the native HTML `<select>` element.

## API

<docoff-react-props src="/components/SelectField/SelectField.jsx"></docoff-react-props>

## Theming

Head to [Forms Theming](/docs/customize/theming/forms) to see shared form theming
options. On top of that, the following options are available for SelectField.

| Custom Property                                      | Description                                                  |
|------------------------------------------------------|--------------------------------------------------------------|
| `--rui-FormField--box--select__caret__border-style`  | SelectField arrow border style (e.g. `solid`)                |
| `--rui-FormField--box--select__caret__background`    | SelectField arrow background (including `url()` or gradient) |
| `--rui-FormField--box--select__option--disabled__color` | Text color of disabled SelectField options                |

[React common props]: https://react.dev/reference/react-dom/components/common#common-props
[ref]: https://reactjs.org/docs/refs-and-the-dom.html
[select-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attributes
