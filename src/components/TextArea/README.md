# TextArea

TextArea enables users to add longer text to a form.

## Basic Usage

To implement the TextArea component, you need to import it first:

```js
import { TextArea } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<TextArea label="Your feedback" />
```

See [API](#api) for all available options.

## General Guidelines

- Use **short and descriptive labels**, ideally nouns rather than seemingly
  polite phrases like _Please enter your message_. Short labels will help your
  users accomplish their task faster.

- **Use text labels** unless it is necessary to wrap text label into
  Popover-like to component to provide additional info about the field.

- Only make the TextArea's label invisible when there is **another visual
  clue** to guide users through filling the input. Using the first option as
  label is not recommended either — it disappears once user makes their choice.

- When a short label is not enough, use **help texts to guide users** before
  they enter anything.

- Optionally you can **pre-fill your text fields with a placeholder** to give
  users an example of what they're expected to fill in. Just remember the
  placeholder disappears once a value is entered so don't put anything important
  there. Usually, en example value starting with “Eg.” works best.

- Use **clear, calm error messages** when there's a problem with what they
  entered. Be positive and focus on solutions to make the error message helpful.

- Ensure the height of a text area **fits within mobile screen sizes.**

## Design Variants

To satisfy the design requirements of your project, all input fields in React UI
come in **two design variants** to choose from: outline and filled. Both can be
further [customized](#theming) with CSS custom properties.

```docoff-react-preview
<TextArea
  label="Your feedback"
/>
<TextArea
  label="Your feedback"
  variant="filled"
/>
```

## Sizes

Aside from the default (medium) size, two additional sizes are available: small
and large.

```docoff-react-preview
<TextArea
  label="Your feedback"
  size="small"
/>
<TextArea
  label="Your feedback"
/>
<TextArea
  label="Your feedback"
  size="large"
/>
<TextArea
  label="Your feedback"
  size="small"
  variant="filled"
/>
<TextArea
  label="Your feedback"
  variant="filled"
/>
<TextArea
  label="Your feedback"
  size="large"
  variant="filled"
/>
```

Full-width fields span the full width of a parent:

```docoff-react-preview
<TextArea
  label="Your feedback"
  fullWidth
/>
<TextArea
  label="Your feedback"
  variant="filled"
  fullWidth
/>
```

## Input Size

The default width of all inputs is 240 px, and it can be
[customized](/docs/customize/theming/overview) with a CSS custom property.
However, you can also **control the size of individual text areas** using
the `rows` and `cols` properties. Additionally, text areas are vertically
resizable by users.

👉 Remember that the `cols` and `rows` HTML attributes **do not limit on how
many characters** the user can enter. Use the
[`maxlength` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#Min_and_max_length)
to achieve that effect.

```docoff-react-preview
<TextArea
  label="Your feedback"
  cols={50}
  rows={6}
/>
<TextArea
  label="Your feedback"
  variant="filled"
  cols={50}
  rows={6}
/>
```

## Invisible Label

In some cases, it may be convenient to visually hide the field label. The label
remains accessible to assistive technologies.

While it may be acceptable for login screens with just a few fields or other
simple forms, it's dangerous to hide labels from users in most cases. Keep in
mind you should **provide another visual clue** so users know what to fill into
the input.

```docoff-react-preview
<TextArea
  label="Feedback"
  isLabelVisible={false}
  placeholder="Eg. What I liked the best was…"
/>
<TextArea
  label="Feedback"
  isLabelVisible={false}
  variant="filled"
  placeholder="Eg. What I liked the best was…"
/>
```

## Horizontal Layout

The default vertical layout is very easy to use and work with. However, there
are situations where horizontal layout suits better — and that's why React UI
supports this kind of layout as well.

```docoff-react-preview
<TextArea
  label="Your feedback"
  layout="horizontal"
/>
<TextArea
  label="Your feedback"
  layout="horizontal"
  variant="filled"
/>
<TextArea
  label="Your feedback"
  layout="horizontal"
  fullWidth
/>
<TextArea
  label="Your feedback"
  layout="horizontal"
  variant="filled"
  fullWidth
/>
<TextArea
  isLabelVisible={false}
  label="Your feedback"
  layout="horizontal"
  placeholder="Your feedback"
  fullWidth
/>
<TextArea
  isLabelVisible={false}
  label="Your feedback"
  layout="horizontal"
  placeholder="Your feedback"
  variant="filled"
  fullWidth
/>
```

## Help Text

You may provide an additional help text to clarify how the input should be
filled.

```docoff-react-preview
<TextArea
  label="Your feedback"
  helpText="Why would you recommend us?"
/>
<TextArea
  label="Your feedback"
  variant="filled"
  helpText="Why would you recommend us?"
/>
<TextArea
  label="Your feedback"
  layout="horizontal"
  helpText="Why would you recommend us?"
/>
<TextArea
  label="Your feedback"
  layout="horizontal"
  helpText="Why would you recommend us?"
  variant="filled"
/>
<TextArea
  label="Your feedback"
  layout="horizontal"
  helpText="Why would you recommend us?"
  fullWidth
/>
<TextArea
  label="Your feedback"
  layout="horizontal"
  variant="filled"
  helpText="Why would you recommend us?"
  fullWidth
/>
```

## States

### Validation States

Validation states visually present the result of validation of the input. You
should always **provide a help text for states other than valid** so users know
what happened and what action they should take or what options they have.

```docoff-react-preview
<TextArea
  label="Your feedback"
  onChange={() => {}}
  validationState="valid"
  validationText="Looks good!"
  value="Like that!"
  required
/>
<TextArea
  label="Your feedback"
  onChange={() => {}}
  validationState="warning"
  validationText="The feedback should be at least 3 characters long."
  value=".."
  required
/>
<TextArea
  label="Your feedback"
  validationState="invalid"
  validationText="Please share your feedback with us."
  required
/>
<TextArea
  label="Your feedback"
  onChange={() => {}}
  validationState="valid"
  validationText="Looks good!"
  variant="filled"
  value="Like that!"
  required
/>
<TextArea
  label="Your feedback"
  onChange={() => {}}
  validationState="warning"
  validationText="The feedback should be at least 3 characters long."
  variant="filled"
  value=".."
  required
/>
<TextArea
  label="Your feedback"
  validationState="invalid"
  validationText="Please share your feedback with us."
  variant="filled"
  required
/>
```

### Disabled State

It's possible to disable the whole input.

```docoff-react-preview
<TextArea
  label="Your feedback"
  disabled
/>
<TextArea
  label="Your feedback"
  variant="filled"
  disabled
/>
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't
interfere with the API of the React component and that aren't filtered out by
[`transferProps`](/docs/js-helpers/transferProps) helper are forwarded to the
`<textarea>` HTML element. This enables making the component interactive and
helps to improve its accessibility.

```docoff-react-preview
<TextArea
  label="Address"
  autoComplete="street-address"
  minLength={3}
  maxLength={80}
/>
<TextArea
  label="Address"
  variant="filled"
  autoComplete="street-address"
  minLength={3}
  maxLength={80}
/>
```

👉 For the full list of supported attributes refer to:

- [`<textarea>` HTML element attributes][textarea-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}

## Forwarding ref

If you provide [ref], it is forwarded to the native HTML `<textarea>` element.

## API

<docoff-react-props src="/components/TextArea/TextArea.jsx"></docoff-react-props>

## Theming

Head to [Forms Theming](/docs/customize/theming/forms) to see shared form theming
options.

[React common props]: https://react.dev/reference/react-dom/components/common#common-props
[ref]: https://reactjs.org/docs/refs-and-the-dom.html
[textarea-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attributes
