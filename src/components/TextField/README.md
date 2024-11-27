# TextField

TextField allows users to input text information.

## Basic Usage

To implement the TextField component, you need to import it first:

```js
import { TextField } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<TextField label="First name" />
```

See [API](#api) for all available options.

## General Guidelines

- Use the **most suitable input type** for current context: aside from the
  common `text` type, there are also `email`, `number`, `password`, and `tel`
  types at your disposal. A properly chosen input type is especially important
  for touch users as it triggers an appropriate virtual keyboard, so it helps
  speed up the completion of the field.

- **Beware of the `number` input type:** it may not be always what you want.
  Not all number-like values are actually numbers, e.g. phone numbers, credit
  card numbers, or business IDs. In such cases use the most appropriate input
  type (probably `text` or `tel`) along with the [`pattern` attribute][pattern]
  to improve the input experience for touch users.

- Use **short and descriptive labels**, ideally nouns rather than seemingly
  polite phrases like _Please enter your first name_. Short labels will help
  your users accomplish their task faster.

- **Use text labels** unless it is necessary to wrap text label into
  Popover-like to component to provide additional info about the field.

- Only make the TextField's label invisible when there is **another visual
  clue** to guide users through filling the input.

- When a short label is not enough, use **help texts to guide users** before
  they enter anything.

- Optionally you can **pre-fill your text fields with a placeholder** to give
  users an example of what they're expected to fill in. Just remember the
  placeholder disappears once a value is entered so don't put anything important
  there. Usually, en example value starting with “Eg.” works best.

- Use **clear, calm error messages** when there's a problem with what they
  entered. Be positive and focus on solutions to make the error message helpful.

- When asking users for their contact information or other personal information,
  make use of the [`autocomplete` attribute][autocomplete] to help them fill the
  form faster.

## Design Variants

To satisfy the design requirements of your project, all input fields in React UI
come in **two design variants** to choose from: outline and filled. Both can be
further [customized](#theming) with CSS custom properties.

```docoff-react-preview
<TextField
  label="First name"
/>
<TextField
  label="First name"
  variant="filled"
/>
```

## Sizes

Aside from the default (medium) size, two additional sizes are available: small
and large.

```docoff-react-preview
<TextField
  label="First name"
  size="small"
/>
<TextField
  label="First name"
/>
<TextField
  label="First name"
  size="large"
/>
<TextField
  label="First name"
  size="small"
  variant="filled"
/>
<TextField
  label="First name"
  variant="filled"
/>
<TextField
  label="First name"
  size="large"
  variant="filled"
/>
```

Full-width fields span the full width of a parent:

```docoff-react-preview
<TextField
  label="First name"
  fullWidth
/>
<TextField
  label="First name"
  variant="filled"
  fullWidth
/>
```

## Input Types

Aside from the common `text` type, there are also `email`, `number`, `password`,
and `tel` types at your disposal.

```docoff-react-preview
<TextField
  label="Email"
  type="email"
/>
<TextField
  label="Email"
  variant="filled"
  type="email"
/>
<TextField
  label="Age"
  type="number"
/>
<TextField
  label="Age"
  variant="filled"
  type="number"
/>
<TextField
  label="Password"
  type="password"
/>
<TextField
  label="Password"
  variant="filled"
  type="password"
/>
<TextField
  label="Phone"
  type="tel"
/>
<TextField
  label="Phone"
  variant="filled"
  type="tel"
/>
```

## Input Size

The default width of all inputs is 240 px, and it can be [customized](#theming)
with a CSS custom property. However, you can also **change the width of
individual text fields** using the `inputSize` property. It (obviously) sets the
`size` attribute of the `input` element and is further picked up by CSS to
normalize rendering across browsers.

👉 Remember that the [`size`][size] and [`max`][max] HTML attributes **don't
limit on how many characters** the user can enter. Use the `maxlength`
attribute to achieve that effect (doesn't work for `number` input type though).

👉 Note that according to the HTML specification, the `size` attribute (invoked
by `inputSize` API option) is
[not available for `number` input type][input-number-size]. TextField supports
`inputSize` option for all types of inputs, so you can use it whenever you find
it suitable. Just keep in mind the `size` attribute will not be present in the
DOM for numeric inputs.

```docoff-react-preview
<TextField
  inputSize={3}
  label="Title"
/>
<TextField
  inputSize={3}
  label="Title"
  variant="filled"
/>
<TextField
  inputSize={3}
  label="Age"
  type="number"
/>
<TextField
  inputSize={3}
  label="Age"
  type="number"
  variant="filled"
/>
```

## Invisible Label

In some cases, it may be convenient to visually hide the field label. The label
remains accessible to assistive technologies.

While it may be acceptable for login screens with just a few fields or for other
simple forms, it's dangerous to hide labels from users in most cases. Keep in
mind you should **provide another visual clue** so users know what to fill into
the input.

```docoff-react-preview
<TextField
  label="User name"
  isLabelVisible={false}
  placeholder="Eg. john@example.com"
/>
<TextField
  label="User name"
  isLabelVisible={false}
  variant="filled"
  placeholder="Eg. john@example.com"
/>
```

## Horizontal Layout

The default vertical layout is very easy to use and work with. However, there
are situations where horizontal layout suits better — and that's why React UI
supports this kind of layout as well.

```docoff-react-preview
<TextField
  inputSize={3}
  label="Title"
  layout="horizontal"
/>
<TextField
  inputSize={3}
  label="Title"
  layout="horizontal"
  variant="filled"
/>
<TextField
  label="First name"
  layout="horizontal"
/>
<TextField
  label="First name"
  layout="horizontal"
  variant="filled"
/>
<TextField
  label="First name"
  layout="horizontal"
  fullWidth
/>
<TextField
  label="First name"
  layout="horizontal"
  variant="filled"
  fullWidth
/>
<TextField
  isLabelVisible={false}
  label="First name"
  layout="horizontal"
  placeholder="First name"
  fullWidth
/>
<TextField
  isLabelVisible={false}
  label="First name"
  layout="horizontal"
  placeholder="First name"
  variant="filled"
  fullWidth
/>
```

## Help Text

You may provide an additional help text to clarify how the input should be
filled.

```docoff-react-preview
<TextField
  label="First name"
  helpText="Choose one or more kinds of fruit to feel happy."
/>
<TextField
  label="First name"
  variant="filled"
  helpText="Choose one or more kinds of fruit to feel happy."
/>
<TextField
  label="First name"
  layout="horizontal"
  helpText="Choose one or more kinds of fruit to feel happy."
/>
<TextField
  label="First name"
  layout="horizontal"
  helpText="Choose one or more kinds of fruit to feel happy."
  variant="filled"
/>
<TextField
  label="First name"
  layout="horizontal"
  helpText="Choose one or more kinds of fruit to feel happy."
  fullWidth
/>
<TextField
  label="First name"
  layout="horizontal"
  variant="filled"
  helpText="Choose one or more kinds of fruit to feel happy."
  fullWidth
/>
```

Keep in mind that **long help texts don't play well with small input sizes,**
especially in vertical layout. To fix this at least for horizontal layout, help
text expands over the full field width when the desired input width (based on
`inputSize` option) is 10 characters or smaller.

```docoff-react-preview
<TextField
  inputSize={3}
  label="Title"
  layout="horizontal"
  helpText="What academic degree do you hold?"
/>
<TextField
  inputSize={3}
  label="Title"
  layout="horizontal"
  variant="filled"
  helpText="What academic degree do you hold?"
/>
<TextField
  label="Age"
  layout="horizontal"
  min={13}
  max={120}
  inputSize={3}
  type="number"
  helpText="How old do you see yourself?"
/>
<TextField
  label="Age"
  layout="horizontal"
  min={13}
  max={120}
  inputSize={3}
  variant="filled"
  type="number"
  helpText="How old do you see yourself?"
/>
```

## States

### Validation States

Validation states visually present the result of validation of the input. You
should always **provide a validation message for states other than valid** so
users know what happened and what action they should take or what options they
have.

```docoff-react-preview
<TextField
  label="User name"
  onChange={() => {}}
  validationState="valid"
  validationText="Looks good!"
  value="johnny1986"
  required
/>
<TextField
  label="User name"
  onChange={() => {}}
  validationState="warning"
  validationText={(
    <>
      Account with this name already exists, pick a different one.
      {' '}
      <TextLink href="#" label="Forgot your password?" />
    </>
  )}
  value="joe"
  required
/>
<TextField
  label="User name"
  validationState="invalid"
  validationText="Please enter a user name of your choice."
  required
/>
<TextField
  label="User name"
  onChange={() => {}}
  validationState="valid"
  validationText="Looks good!"
  variant="filled"
  value="johnny1986"
  required
/>
<TextField
  label="User name"
  onChange={() => {}}
  validationState="warning"
  validationText={(
    <>
      Account with this name already exists, pick a different one.
      {' '}
      <TextLink href="#" label="Forgot your password?" />
    </>
  )}
  variant="filled"
  value="joe"
  required
/>
<TextField
  label="User name"
  validationState="invalid"
  validationText="Please enter a user name of your choice."
  variant="filled"
  required
/>
```

### Disabled State

It's possible to disable the whole input.

```docoff-react-preview
<TextField
  label="First name"
  onChange={() => {}}
  value="John"
  disabled
/>
<TextField
  label="First name"
  onChange={() => {}}
  variant="filled"
  value="John"
  disabled
/>
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't
interfere with the API of the React component and that aren't filtered out by
[`transferProps`](/docs/js-helpers/transferProps) helper are forwarded to the
`<input>` HTML element. This enables making the component interactive and helps
to improve its accessibility.

```docoff-react-preview
<TextField
  label="Address"
  autoComplete="street-address"
  minLength={3}
  maxLength={80}
/>
<TextField
  label="Address"
  variant="filled"
  autoComplete="street-address"
  minLength={3}
  maxLength={80}
/>
<TextField
  inputSize={3}
  min={13}
  max={120}
  label="Age"
  type="number"
/>
<TextField
  inputSize={3}
  min={13}
  max={120}
  label="Age"
  type="number"
  variant="filled"
/>
```

👉 For the full list of supported attributes refer to:

- [`<input type="text" />` HTML element attributes][input-text]{:target="_blank"}
- [`<input type="email" />` HTML element attributes][input-email]{:target="_blank"}
- [`<input type="number" />` HTML element attributes][input-number]{:target="_blank"}
- [`<input type="tel" />` HTML element attributes][input-tel]{:target="_blank"}
- [`<input type="password" />` HTML element attributes][input-password]{:target="_blank"}
- [React common props]{:target="_blank"}

## Forwarding ref

If you provide [ref], it is forwarded to the native HTML `<input>` element.

## API

<docoff-react-props src="/components/TextField/TextField.jsx"></docoff-react-props>

## Theming

Head to [Forms Theming][theming-forms] to see shared form theming options.

[pattern]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern
[autocomplete]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
[size]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text#size
[max]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#max
[input-number-size]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#Controlling_input_size
[input-text]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text#additional_attributes
[input-email]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#additional_attributes
[input-number]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#additional_attributes
[input-tel]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel#additional_attributes
[input-password]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password#additional_attributes
[theming-forms]: /docs/customize/theming/forms
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
[ref]: https://reactjs.org/docs/refs-and-the-dom.html
