# InputGroup

InputGroup visually groups related form fields and actions together.

## Basic Usage

To implement the InputGroup component, you need to import it first:

```js
import { InputGroup } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
React.createElement(() => {
  const [fruit, setFruit] = React.useState('apple');
  const options = [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Pear',
      value: 'pear',
    },
    {
      label: 'Cherry',
      value: 'cherry',
    },
  ];
  return (
    <InputGroup label="Your favourite fruit">
      <SelectField
        label="Your favourite fruit"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
      />
      <TextField
        label="Variety"
        placeholder="Eg. Golden delicious"
      />
      <Button label="Submit" />
    </InputGroup>
  );
})
```

See [API](#api) for all available options.

## General Guidelines

- Use input group to group **related fields and actions** that a user can take.
  Input fields and buttons should not be grouped just to save space on the
  screen.

- While the number of child inputs is not limited, keep in mind the layout of
  InputGroup is currently **not responsive: the inputs do not shrink nor wrap**.
  Make sure your inputs fit their container, especially on small screens.

- In the background, InputGroup uses the [`fieldset`][fieldset] element. Not
  only it improves the [accessibility] of the group, it also allows you to make
  use of its built-in features like disabling all nested inputs or pairing the
  group with a form outside. Consult [the MDN docs][fieldset] to learn more.

- InputGroup currently **supports grouping of**
  [TextField](/components/TextField), [SelectField](/components/SelectField),
  and [Button](/components/Button) components.

- To group [Buttons](/components/Button) only, use the
  [ButtonGroup](/components/ButtonGroup) component which is designed
  specifically for that purpose.

## Sizes

All existing field and button sizes are also available on the input group level:
small, medium, and large.

```docoff-react-preview
<InputGroup
  label="Small size"
  size="small"
>
  <TextField label="Input" />
  <Button label="Submit" />
</InputGroup>
<InputGroup label="Medium size">
  <TextField label="Input" />
  <Button label="Submit" />
</InputGroup>
<InputGroup
  label="Large size"
  size="large"
>
  <TextField label="Input" />
  <Button label="Submit" />
</InputGroup>
```

### Shared Property

You can set the `size` property directly on InputGroup to be shared for all
fields and buttons inside the group. This property is then passed over to
individual elements. At the same time, it **cannot be overridden** on the
fields' or buttons' level. While technically possible, from the design point of
view it's undesirable to group elements of totally different types or sizes.

## Invisible Label

In some cases, it may be convenient to visually hide the group label. The label
remains accessible to assistive technologies. Labels of individual inputs are
always visually hidden.

While it may be acceptable for login screens with just a few fields or for other
simple forms, it's dangerous to hide labels from users in most cases. Keep in
mind you should **provide another visual clue** so users know what to fill into
the input.

```docoff-react-preview
<InputGroup
  isLabelVisible={false}
  label="First and last name"
>
  <TextField
    label="First name"
    placeholder="Eg. John"
  />
  <TextField
    label="Last name"
    placeholder="Eg. Doe"
  />
  <Button label="Submit" />
</InputGroup>
```

## Horizontal layout

The default vertical layout is very easy to use and work with. However, there
are situations where horizontal layout suits better — and that's why React UI
supports this kind of layout as well.

```docoff-react-preview
<InputGroup
  label="Horizontal layout"
  layout="horizontal"
>
  <FileInputField id="my-file" label="Attachment" onFilesChanged={() => {}} />
  <Button label="Submit" />
</InputGroup>
```

## States

### Disabled State

Disables all fields and buttons inside the group.

```docoff-react-preview
<InputGroup disabled label="Disabled group">
  <TextField label="Label" />
  <Button label="Submit" />
</InputGroup>
```

### Validation States

Validation states visually present the result of validation of the grouped
inputs. Input group's validation state is taken from its child inputs. You
should always **provide validation messages for states other than valid**
directly through `validationTexts` prop so users know what happened and what
action they should take or what options they have. These messages are not
semantically tied to the `children` elements, the connection should be expressed
in textual form in the actual message. The individual `children` elements must
not show any `validationText`, they only show their respective `validationState`.
Validation messages passed to input elements' `validationText` prop will be
ignored.

👉 While there is a `required` property to visually denote the whole input group
is required, there is no functional effect as there is no such HTML attribute
for the underlying `<fieldset>` element.

```docoff-react-preview
<InputGroup
  label="First and last name"
  required
  validationTexts={[
    "First name must be filled in.",
    "Last name must be filled in.",
  ]}
>
  <TextField
    label="First name"
    placeholder="Eg. John"
    required
    validationState="invalid"
  />
  <TextField
    label="Last name"
    placeholder="Eg. Doe"
    required
    validationState="invalid"
  />
  <Button label="Submit" />
</InputGroup>
<InputGroup
  label="First and last name"
  required
  validationTexts={[
    "Last name should not include any digits.",
  ]}
>
  <TextField
    label="First name"
    placeholder="Eg. John"
    required
    value="John"
  />
  <TextField
    label="Last name"
    placeholder="Eg. Doe"
    required
    validationState="warning"
    value="123Doe"
  />
  <Button label="Submit" />
</InputGroup>
<InputGroup
  label="First and last name"
  required
>
  <TextField
    label="First name"
    placeholder="Eg. John"
    required
    validationState="valid"
    value="John"
  />
  <TextField
    label="Last name"
    placeholder="Eg. Doe"
    required
    validationState="valid"
    value="Doe"
  />
  <Button label="Submit" />
</InputGroup>
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't
interfere with the API of the React component and that aren't filtered out by
[`transferProps`](/docs/js-helpers/transferProps) helper are forwarded to the
root `<fieldset>` HTML element. This enables making the component interactive
and helps to improve its accessibility.

👉 For the full list of supported attributes refer to:

- [`<fieldset>` HTML element attributes][fieldset-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}

## API

<docoff-react-props src="/components/InputGroup/InputGroup.jsx"></docoff-react-props>

## Theming

| Custom Property                                                    | Description                                    |
|--------------------------------------------------------------------|------------------------------------------------|
| `--rui-InputGroup__gap`                                            | Gap between elements                           |
| `--rui-InputGroup__inner-border-radius`                            | Inner border radius of elements                |

[accessibility]: https://www.w3.org/WAI/tutorials/forms/grouping/
[fieldset]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
[fieldset-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset#attributes
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
