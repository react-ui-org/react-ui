# FormLayout

The FormLayout aligns form fields into an organized grid.

## Basic Usage

To implement the FormLayout component, you need to import it first:

```js
import { FormLayout } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<FormLayout>
  <TextField label="A form element" />
</FormLayout>
```

See [API](#api) for all available options.

## General Guidelines

Since all form fields in React UI are styled as inline blocks, they **queue up
one after another in a row by default.** The FormLayout component is there to
make building **vertical and horizontal forms** easy. It uses the right tool for
the job: the [CSS grid layout][grid].

- Put **only form field components** from React UI inside the FormLayout and
  make sure they are **direct descendants** of it (React [fragments] are
  supported!). All React UI form components are ready for this use case and
  don't need to be wrapped in any `div`s. Namely, the FormLayout supports the
  following React UI components:
  [CheckboxField](/components/CheckboxField),
  [Radio](/components/Radio), [SelectField](/components/SelectField),
  [TextArea](/components/TextArea), [TextField](/components/TextField),
  and [Toggle](/components/Toggle).

- Use the [FormLayoutCustomField](#custom-fields) component when you need to
  place any **custom content** inside the FormLayout. This layout helper ensures
  your content is properly spaced and aligned with other FormLayout elements.
  Do **not** try to put any custom HTML or React components directly into
  FormLayout without wrapping it with the FormLayoutCustomField first.

👉 For usage in auto-width Modal, you may need to turn on the `autoWidth` option
for your FormLayout. This prevents FormLayout from unexpectedly growing in
browsers that [don't support][rui-232] [CSS subgrid][subgrid] in cases when
there are longer validation messages or help texts.

## Vertical Layout

Vertical FormLayout works similar to single-column [Grid](/components/Grid)
layout while it also forces vertical layout mode on form fields. To use this
layout, simply wrap your form fields with the FormLayout component:

```docoff-react-preview
<FormLayout>
  <TextField label="A form element" />
  <TextField label="Another form element" />
  <TextField label="Yet another one" />
</FormLayout>
```

## Horizontal Layout

Horizontal FormLayout is designed for horizontal form fields: it nicely **aligns
labels and inputs in an organized grid.** It is applied starting from the `md`
viewport size onward and it forces the horizontal layout on the fields.

```docoff-react-preview
<FormLayout fieldLayout="horizontal">
  <TextField label="A form element" />
  <TextField label="Another form element" />
  <TextField label="Yet another one" />
</FormLayout>
```

### Label Width

In the horizontal layout mode, it's possible to fine-tune the way how the form
will be aligned through the `labelWidth` option to cover various design
requirements. It comes with **three globally shared options:** default width,
auto width, and limited width. For cases where an individual manual width works
better, there is the **local custom width mode** which enables setting a width
that is applied just for the current FormLayout.

👉 All global label width options can be easily [customized](/docs/customize/theming/overview)
with CSS custom properties.

#### Label Width Options

- The `default` mode (global) sets the width of all labels to a **global default
  value** which is 10 em.

- The `auto` mode (global) aligns the form **according to the longest label.**

- The `limited` mode (global) works as `auto` except it's intended for values
  that **set a limit for the label width.** Its default value is
  `fitcontent(50%)` which also aligns the form according to the longest label
  like `auto`, but with the difference that the labels cannot be wider than
  50 % of the FormLayout.

- The `custom` mode (local) allows you to enter any **custom label width for
  individual FormLayouts.**

```docoff-react-preview
React.createElement(() => {
  const [labelWidth, setLabelWidth] = React.useState('default');
  const [customLabelWidth, setCustomLabelWidth] = React.useState('20em');
  return (
    <div>
      <Toolbar align="baseline">
        <ToolbarItem>
          <span id="label-width-options-label">Label width:</span>
        </ToolbarItem>
        <ToolbarItem>
          <ButtonGroup aria-labelledby="label-width-options-label">
            <Button
              color={labelWidth === 'default' ? 'selected' : 'secondary'}
              label="default"
              onClick={() => setLabelWidth('default')}
            />
            <Button
              color={labelWidth === 'auto' ? 'selected' : 'secondary'}
              label="auto"
              onClick={() => setLabelWidth('auto')}
            />
            <Button
              color={labelWidth === 'limited' ? 'selected' : 'secondary'}
              label="limited"
              onClick={() => setLabelWidth('limited')}
            />
            <Button
              color={labelWidth === 'custom' ? 'selected' : 'secondary'}
              label="custom"
              onClick={() => setLabelWidth('custom')}
            />
          </ButtonGroup>
        </ToolbarItem>
        {labelWidth === 'custom' && (
          <ToolbarItem>
            <TextField
              inputSize={5}
              isLabelVisible={false}
              label="Custom label width"
              layout="horizontal"
              onChange={(e) => setCustomLabelWidth(e.target.value)}
              value={customLabelWidth}
            />
          </ToolbarItem>
        )}
      </Toolbar>
      <FormLayout
        fieldLayout="horizontal"
        labelWidth={labelWidth === 'custom' ? customLabelWidth : labelWidth}
      >
        <TextField label="A form element" />
        <TextField
          label={'Another form element with a very long label that is so '
            + 'long that in the auto mode, it should make the label column '
            + 'grow until the inputs reach the end of the line, but it will '
            + 'not exceed 50 % of the FormLayout width in the limited label '
            + 'width mode'}
        />
        <TextField label="Yet another one" />
      </FormLayout>
    </div>
  );
});
```

### Limitations

#### Label Position

Label position of inline form fields (CheckboxField, Toggle) is ignored in
horizontal FormLayout.

#### Modals

Please note the `auto` and `limited` label width options may not function
correctly in combination with other auto layout mechanisms, e.g. the auto-width
[Modal](/components/Modal). It's just too much of magic that does not quite
work together yet 🎩.

## Custom Fields

You can even place any content you need into the FormLayout — just wrap it with
the FormLayoutCustomField component. This layout
helper ensures your content is properly spaced and aligned with to other
FormLayout elements. FormLayoutCustomFields are designed to work solely inside
the FormLayout component.

```docoff-react-preview
<FormLayout fieldLayout="horizontal" labelWidth="auto">
  <TextField label="A form element" />
  <FormLayoutCustomField label="Optional custom field label">
    <docoff-placeholder bordered>Custom field content</docoff-placeholder>
  </FormLayoutCustomField>
  <TextField label="Another form element" />
</FormLayout>
```

👉 While you can set FormLayoutCustomField as `disabled`, `valid` or `required`
and its styles may affect contained form fields through CSS cascade, don't
forget to mirror the aforementioned properties to the contained form fields too
as API options as such are **not** inherited.

### Label Alignment

If you are in a situation with one or more box form fields inside your
FormLayoutCustomField, you may want to have its label aligned with the fields
inside. Since it's [not quite possible to do this automatically][rui-265] due to
limited browser support, there is `innerFieldSize` option which accepts any of
existing box field sizes (small, medium, or large) and is intended right for
this task.

```docoff-react-preview
<FormLayout fieldLayout="horizontal" labelWidth="auto">
  <TextField label="A form element" />
  <FormLayoutCustomField
    innerFieldSize="medium"
    label="Custom field label aligned to inner text input"
  >
    <TextField
      isLabelVisible={false}
      label="A form element"
      placeholder="Text field with invisible label"
    />
  </FormLayoutCustomField>
  <TextField label="Another form element" />
</FormLayout>
```

### Validation States

Custom fields support the same validation states as regular form fields to
provide labels with optional feedback style.

```docoff-react-preview
<FormLayout fieldLayout="horizontal" labelWidth="auto">
  <TextField label="A form element" />
  <FormLayoutCustomField
    label="Custom field label in valid state"
    validationState="valid"
  >
    <docoff-placeholder bordered>Custom field content</docoff-placeholder>
  </FormLayoutCustomField>
  <TextField label="Another form element" />
</FormLayout>
```

### Accessibility

If possible, use the `labelForId` option to provide ID of contained form field
so the field remains accessible via custom field label.

You can also specify size of contained form field so custom field label is
properly vertically aligned.

```docoff-react-preview
React.createElement(() => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <FormLayout fieldLayout="horizontal" labelWidth="auto">
      <TextField label="A form element" />
      <FormLayoutCustomField
        fullWidth
        label="Custom field label aligned with medium form field"
        labelForId="my-text-field-custom-accessibility-2"
        innerFieldSize="medium"
      >
        <Toolbar align="middle" dense>
          <ToolbarItem>
            <TextField
              isLabelVisible={false}
              label="A form element"
              placeholder="Text field with invisible label"
            />
          </ToolbarItem>
          <ToolbarItem>
            <CheckboxField
              checked={isChecked}
              label="Another form field"
              onChange={() => setIsChecked(!isChecked)}
            />
          </ToolbarItem>
        </Toolbar>
      </FormLayoutCustomField>
      <TextField label="Another form element" />
    </FormLayout>
  )
});
```

## Full Example

This is a demo of all components supported by FormLayout.

```docoff-react-preview
React.createElement(() => {
  const [fieldLayout, setFieldLayout] = React.useState('horizontal');
  const [fruit, setFruit] = React.useState('apple');
  const [isDeliveryAddress, setIsDeliveryAddress] = React.useState(true);
  const [receiveNewsletter, setReceiveNewsletter] = React.useState(true);
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
    <div>
      <Toolbar>
        <ToolbarItem>
          <ButtonGroup>
            <Button
              color={fieldLayout === 'horizontal' ? 'selected' : 'secondary'}
              label="Horizontal layout"
              onClick={() => setFieldLayout('horizontal')}
            />
            <Button
              color={fieldLayout === 'vertical' ? 'selected' : 'secondary'}
              label="Vertical layout"
              onClick={() => setFieldLayout('vertical')}
            />
          </ButtonGroup>
        </ToolbarItem>
      </Toolbar>
      <FormLayout fieldLayout={fieldLayout} labelWidth="auto">
        <>
          <TextField
            label="First Name"
          />
          <TextField
            label="Last Name"
          />
        </>
        <TextField
          helpText="Optional"
          label="Email address"
          type="email"
        />
        <>
          <TextField
            label="Address"
            placeholder="Address line 1"
          />
          <TextField
            isLabelVisible={false}
            label="Address 2"
            placeholder="Address line 2"
          />
          <TextField
            inputSize={6}
            label="ZIP"
            validationState="invalid"
            validationText="ZIP should be 5 to 6 digits long code."
          />
          <FormLayoutCustomField label="Country">
            <span>Czech Republic</span>
          </FormLayoutCustomField>
          <CheckboxField
            checked={isDeliveryAddress}
            helpText="Uncheck if you wish to deliver to a different address."
            label="This is my delivery address"
            onChange={() => setIsDeliveryAddress(!isDeliveryAddress)}
          />
        </>
        <SelectField
          label="Your favourite fruit"
          onChange={(e) => setFruit(e.target.value)}
          options={options}
          value={fruit}
        />
        <TextArea
          fullWidth
          label="Message"
          rows={3}
        />
        <FileInputField
          id="my-file"
          label="Attachment"
          onFilesChanged={() => {}}
        />
        <Toggle
          checked={receiveNewsletter}
          helpText="Only once per week!"
          label="Receive weekly newsletter"
          onChange={() => setReceiveNewsletter(!receiveNewsletter)}
          required
        />
        <Radio
          label="And fruit again!"
          onChange={(e) => setFruit(e.target.value)}
          options={options}
          value={fruit}
        />
        <InputGroup label="Promo code">
          <TextField label="Code" />
          <Button label="Apply" color="secondary" priority="outline" />
        </InputGroup>
      </FormLayout>
    </div>
  )
});
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't
interfere with the API of the React component and that aren't filtered out by
[`transferProps`](/docs/js-helpers/transferProps) helper are forwarded to the
root `<div>` HTML element. This enables making the component interactive and
helps to improve its accessibility.

👉 For the full list of supported attributes refer to:

- [`<div>` HTML element attributes][div-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}

## API

<docoff-react-props src="/components/FormLayout/FormLayout.jsx"></docoff-react-props>

### FormLayoutCustomField API

A place for custom content inside FormLayout.

<docoff-react-props src="/components/FormLayout/FormLayoutCustomField.jsx"></docoff-react-props>

## Theming

| Custom Property                                      | Description                                                  |
|------------------------------------------------------|--------------------------------------------------------------|
| `--rui-FormLayout__row-gap`                          | Gap between individual rows                                  |
| `--rui-FormLayout--horizontal__label__width`         | Default label width                                          |
| `--rui-FormLayout--horizontal__label__width--auto`   | Label width in automatic layout                              |
| `--rui-FormLayout--horizontal__label__width--limited` | Label width in limited-width layout                         |

### FormLayoutCustomField Theming

FormLayoutCustomField can be styled using a small subset of
[other form fields theming options](/docs/customize/theming/forms).

| Custom Property                                      | Description                                                  |
|------------------------------------------------------|--------------------------------------------------------------|
| `--rui-FormField--custom--default__surrounding-text-color` | Custom field label color in default state              |
| `--rui-FormField--custom--disabled__surrounding-text-color` | Custom field label color in disabled-like state       |

[div-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div#attributes
[fragments]: https://reactjs.org/docs/fragments.html
[grid]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
[rui-232]: https://github.com/react-ui-org/react-ui/issues/232
[rui-265]: https://github.com/react-ui-org/react-ui/issues/265
[subgrid]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid
