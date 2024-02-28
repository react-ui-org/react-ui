# FileInputField

FileInputField allows users to select files to upload.

## Basic Usage

To implement the FileInputField component, you need to import it first:

```js
import { FileInputField } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<FileInputField label="Attachment" />
```

See [API](#api) for all available options.

## General Guidelines

- Apply [native HTML attributes](#forwarding-html-attributes) to control **what
  and how many files** users can select.

- Use **short and descriptive labels**, ideally nouns rather than seemingly
  polite phrases like _Please attach your file here_. Short labels will help
  your users accomplish their task faster.

- Only make the FileInputField's label invisible when there is **another visual
  clue** to guide users through filling the input.

- When a short label is not enough, use **help texts to guide users** before
  they enter anything.

- Use **clear, calm error messages** when there's a problem with what they
  entered. Be positive and focus on solutions to make the error message helpful.

👉 FileInputField implements native HTML `input type="file"`. Therefore, it is
not possible to affect neither its translations (they depend on a browser), nor
appearance.
[Custom translations and appearance](https://github.com/react-ui-org/react-ui/issues/244)
are considered to be implemented at some point in the future. However, from the
layout perspective, FileInputFields work just like any other form fields.

## Sizes

Full-width fields span the full width of a parent:

```docoff-react-preview
<FileInputField
  fullWidth
  label="First name"
/>
```

## Invisible Label

In some cases, it may be convenient to visually hide the field label. The label
remains accessible to assistive technologies.

While it may be acceptable for simple forms with just a few fields, it's
dangerous to hide labels from users in most cases. Keep in mind you should
**provide another visual clue** so users know what to fill into the input.

```docoff-react-preview
<FileInputField
  isLabelVisible={false}
  label="Attachment"
/>
```

## Horizontal Layout

The default vertical layout is very easy to use and work with. However, there
are situations where horizontal layout suits better — and that's why React UI
supports this kind of layout as well.

```docoff-react-preview
<FileInputField
  label="Attachment"
  layout="horizontal"
/>
<FileInputField
  fullWidth
  isLabelVisible={false}
  label="Attachment"
  layout="horizontal"
/>
```

## Help Text

You may provide an additional help text to clarify how the input should be
filled.

```docoff-react-preview
<FileInputField
  helpText="Choose one or more files to upload."
  label="Attachment"
/>
<FileInputField
  helpText="Choose one or more files to upload."
  label="Attachment"
  layout="horizontal"
/>
<FileInputField
  fullWidth
  helpText="Choose one or more files to upload."
  label="Attachment"
  layout="horizontal"
/>
```

## States

### Validation States

Validation states visually present the result of validation of the input. You
should always **provide a validation message for states other than valid** so
users know what happened and what action they should take or what options they
have.

```docoff-react-preview
<FileInputField
  label="Attachment"
  validationState="valid"
  validationText="Looks good!"
/>
<FileInputField
  label="Attachment"
  validationState="invalid"
  validationText="Your file is too big. Please select something smaller."
/>
<FileInputField
  label="Attachment"
  validationState="warning"
  validationText={`
    You selected more than 10 files.
    It may take some time before we process them.
  `}
/>
```

### Disabled State

It's possible to disable the whole input.

```docoff-react-preview
<FileInputField
  disabled
  label="Attachment"
/>
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't interfere
with the API of the React component are forwarded to the root `<input>` HTML
element. This enables making the component interactive and helps to improve
its accessibility.

```docoff-react-preview
<FileInputField
  accept=".pdf,.jpg,.jpeg,.png"
  helpText={`
    Choose up to 10 files. Allowed extensions are .pdf, .jpg, .jpeg, or .png.
    Size limit is 10 MB.
  `}
  label="Attachment"
  multiple
/>
```

👉 For the full list of supported attributes refer to:

- [`<input type="file" />` HTML element attributes][file-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}

## Forwarding ref

If you provide [ref], it is forwarded to the native HTML `<input>` element.

## API

<docoff-react-props src="/components/FileInputField/FileInputField.jsx"></docoff-react-props>

## Theming

Head to [Forms Theming](/docs/customize/theming/forms) to see shared form theming
options.

[React common props]: https://react.dev/reference/react-dom/components/common#common-props
[file-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#additional_attributes
[ref]: https://reactjs.org/docs/refs-and-the-dom.html
