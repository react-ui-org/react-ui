# Forms Theming

To make forms theming easy and robust, form components have many theming
options in common.

General naming convention for CSS custom properties looks as follows:

`--rui-FormField--[<TYPE>]--[<MODIFICATION>]__[<ELEMENT>--[<ELEMENT
TYPE]]--[<INTERACTION STATE>]__<PROPERTY>`

Items in brackets are optional. As you read on you will notice some theming
option groups may have less complicated conventions (that are still subset of
the naming system above).

## Basic Theming

The following theme options define basic appearance of all form fields.

| Custom Property                                      | Description                                                  |
|------------------------------------------------------|--------------------------------------------------------------|
| `--rui-FormField__label__color`                      | Label text color                                             |
| `--rui-FormField__label__font-size`                  | Label font size                                              |
| `--rui-FormField__help-text__font-size`              | Help text font size                                          |
| `--rui-FormField__help-text__font-style`             | Help text font style, e.g. italic                            |
| `--rui-FormField__help-text__color`                  | Help text color                                              |
| `--rui-FormField--required__label__color`            | Color of required input labels                               |
| `--rui-FormField--required__sign`                    | Text appended to required input labels                       |
| `--rui-FormField--required__sign__color`             | Color of text appended to required input labels              |

## Horizontal Layout

Options for fields that support horizontal layout.

| Custom Property                                      | Description                                                  |
|------------------------------------------------------|--------------------------------------------------------------|
| `--rui-FormField--horizontal__label__text-align`     | Text alignment of labels in horizontal layout                |
| `--rui-FormField--horizontal__label__min-width`      | Minimum width of labels in horizontal layout                 |
| `--rui-FormField--horizontal__label__width`          | Default width of labels in horizontal layout                 |
| `--rui-FormField--horizontal__label__padding-y`      | Top and bottom padding to tweak vertical alignment of labels |
| `--rui-FormField--horizontal__label__vertical-alignment` | Vertical box alignment of labels in horizontal layout    |
| `--rui-FormField--horizontal__field__vertical-alignment` | Vertical box alignment of fields in horizontal layout    |
| `--rui-FormField--horizontal--full-width__label__width` | Default width of labels in full-width horizontal layout   |

## Box Fields

Options shared by box form controls. This includes
[TextField](/components/TextField),
[TextArea](/components/TextArea), and
[SelectField](/components/SelectField).

| Custom Property                                      | Description                                                  |
|------------------------------------------------------|--------------------------------------------------------------|
| `--rui-FormField--box__border-width`                 | Control border width                                         |
| `--rui-FormField--box__border-radius`                | Control corner radius                                        |
| `--rui-FormField--box__input__width`                 | Default text input and select box width                      |
| `--rui-FormField--box__input__min-width`             | Minimum text input and select box width                      |
| `--rui-FormField--box__placeholder__color`           | Placeholder text color                                       |

Example:

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
      <style type="text/css">
        {`
        .example {
          margin: 0;
        }

        .example > * {
          margin: 4px;
        }

        .example--themed-form-fields {
          --rui-FormField--box__border-width: 2px;
          --rui-FormField--box__border-radius: 0.5rem;
          --rui-FormField--box__input__width: 300px;
        }
      `}
      </style>
      <TextField
        id="default-outline-text-field"
        label="Default outline text field"
      />
      <TextField
        id="default-filled-text-field"
        label="Default filled text field"
        variant="filled"
      />
      <SelectField
        id="default-outline-select-field"
        label="Default outline select field"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
      />
      <div className="example example--themed-form-fields mt-6">
        <TextField
          id="themed-outline-text-field"
          label="Themed outline text field"
        />
        <TextField
          id="themed-filled-text-field"
          label="Themed filled text field"
          variant="filled"
        />
        <SelectField
          id="themed-outline-select-field"
          label="Themed outline select field"
          onChange={(e) => setFruit(e.target.value)}
          options={options}
          value={fruit}
        />
      </div>
    </React.Fragment>
  )
});
```

### Box Field Variants

Theming options for box form controls. Naming convention looks as follows:

`--rui-FormField--box--<VISUAL VARIANT>--<INTERACTION STATE>__<PROPERTY>`

Where:

- `<VISUAL VARIANT>` is one of `filled` or `outline`,
- `<INTERACTION STATE>` is one of `default`, `hover`, `focus`, or `disabled`,
- `<PROPERTY>` is one of `color`, `border-color`, `background`, `box-shadow`, or
  `surrounding-text-color` (the last one being available only for `default` and
  `disabled` interaction states).

Example:

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
      <style type="text/css">
        {`
        .example {
          margin: 0;
        }

        .example > * {
          margin: 4px;
        }

        .example--themed-form-field-variants {
          --rui-FormField--box__border-width: 0px;
          --rui-FormField--box--outline--default__box-shadow:
            0.1em 0.1em 0.5em rgba(0, 0, 0, 0.2);
          --rui-FormField--box--outline--hover__box-shadow:
            0.1em 0.1em 0.75em rgba(0, 0, 0, 0.3);
          --rui-FormField--box--outline--focus__box-shadow:
            inset 0.1em 0.1em 0.25em rgba(0, 0, 0, 0.2);
        }
      `}
      </style>
      <TextField
        id="default-outline-text-field"
        label="Default outline text field"
      />
      <SelectField
        id="default-outline-select-field"
        label="Default outline select field"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
      />
      <div className="example example--themed-form-field-variants mt-6">
        <TextField
          id="themed-outline-text-field"
          label="Themed outline text field"
        />
        <SelectField
          id="themed-outline-select-field"
          label="Themed outline select field"
          onChange={(e) => setFruit(e.target.value)}
          options={options}
          value={fruit}
        />
      </div>
    </React.Fragment>
  )
});
```

### Box Field Sizes

Available sizes can be adjusted as follows:

`--rui-FormField--box--<SIZE>__<PROPERTY>`

Where:

- `<SIZE>` is one of `small`, `medium`, or `large`
- `<PROPERTY>` is one of `height`, `padding-x`, `padding-y`, or `font-size`

👉 Box field sizes are linked to
[Button sizes](/components/Button/#theming-sizes) so they align nicely when
placed in row.

Example:

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
      <style type="text/css">
        {`
        .example {
          margin: 0;
        }

        .example > * {
          margin: 4px;
        }

        .example--themed-form-field-sizes {
          --rui-FormField--box--medium__height: 3rem;
          --rui-FormField--box--medium__padding-x: 1.25rem;
        }
      `}
      </style>
      <TextField
        id="default-medium-text-field"
        label="Default medium text field"
      />
      <SelectField
        id="default-medium-select-field"
        label="Default medium select field"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        value={fruit}
      />
      <div className="example example--themed-form-field-sizes mt-6">
        <TextField
          id="themed-medium-text-field"
          label="Themed medium text field"
        />
        <SelectField
          id="themed-medium-select-field"
          label="Themed medium select field"
          onChange={(e) => setFruit(e.target.value)}
          options={options}
          value={fruit}
        />
      </div>
    </React.Fragment>
  )
});
```

## Check Fields

Options shared by checkable form controls. This includes
[CheckboxField](/components/CheckboxField), [Radio](/components/Radio),
and [Toggle](/components/Toggle).

| Custom Property                                      | Description                                                  |
|------------------------------------------------------|--------------------------------------------------------------|
| `--rui-FormField--check__input__size`                | Size of check inputs                                         |
| `--rui-FormField--check__input__border-width`        | Border width of check inputs                                 |
| `--rui-FormField--check__input--focus__box-shadow`   | Box shadow to highlight focused inputs                       |
| `--rui-FormField--check__tap-target-size`            | Minimum tap target size                                      |

Interaction states:

| Custom Property                                      | Description                                                  |
|------------------------------------------------------|--------------------------------------------------------------|
| `--rui-FormField--check--default__border-color`      | Border color of unchecked inputs                             |
| `--rui-FormField--check--default__check-background-color` | Background color of unchecked inputs                    |
| `--rui-FormField--check--checked__border-color`      | Border color of checked inputs                               |
| `--rui-FormField--check--checked__check-background-color` | Background color of checked inputs                      |
| `--rui-FormField--check--disabled__border-color`     | Border color of disabled unchecked inputs                    |
| `--rui-FormField--check--disabled__check-background-color` | Background color of disabled unchecked inputs          |
| `--rui-FormField--check--checked-disabled__border-color` | Border color of disabled checked inputs                  |
| `--rui-FormField--check--checked-disabled__check-background-color` | Background color of disabled checked inputs    |

Example:

```docoff-react-preview
React.createElement(() => {
  const [agree, setAgree] = React.useState(true);
  const [fruit, setFruit] = React.useState('apple');
  const [studioQuality, setStudioQuality] = React.useState(true);
  return (
    <React.Fragment>
      <style type="text/css">
        {`
        .example {
          margin: 0;
        }

        .example > * {
          margin: 4px;
        }

        .example--themed-check-fields {
          --rui-FormField--check__input__border-width: 2px;
          --rui-FormField--check--checked__border-color: LightSeaGreen;
          --rui-FormField--check--checked__check-background-color: MediumAquamarine;
        }
        `}
      </style>
      <Radio
        id="default-radio"
        label="Default radio"
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
      <CheckboxField
        checked={agree}
        id="default-checkbox"
        label="Default checkbox"
        onChange={() => setAgree(!agree)}
      />
      <Toggle
        checked={studioQuality}
        id="default-toggle"
        label="Default toggle"
        onChange={() => setStudioQuality(!studioQuality)}
      />
      <div className="example example--themed-check-fields mt-6">
        <Radio
          id="themed-radio"
          label="Themed radio"
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
        <CheckboxField
          checked={agree}
          id="themed-checkbox"
          label="Themed checkbox"
          onChange={() => setAgree(!agree)}
        />
        <Toggle
          checked={studioQuality}
          id="themed-toggle"
          label="Themed toggle"
          onChange={() => setStudioQuality(!studioQuality)}
        />
      </div>
    </React.Fragment>
  )
});
```

## Validation States

Theming options for validation states are shared by all form components. Naming
convention looks as follows:

`--rui-FormField--<VALIDATION STATE>--<INTERACTION STATE>__<PROPERTY>`

Where:

- `<VALIDATION STATE>` is one of `invalid`, `valid`, or `warning`
- `<INTERACTION STATE>` is one of `default`, `checked`, `disabled`, or
  `checked-disabled`
- `<PROPERTY>` is one of `color`, `border-color`, `background`,
  `check-background-color`, `box-shadow`, or `surrounding-text-color`

Not all properties are used by all components, this varies from component to
component. Also, `hover` interaction state is unavailable for validation states
everywhere — `default` state appearance is retained on hovering. For box fields,
`focus` state for validation states is inherited from default form field
appearance (i.e. as if no validation state was set).

Example:

```docoff-react-preview
React.createElement(() => {
  const [agree, setAgree] = React.useState(true);
  const [fruit, setFruit] = React.useState('apple');
  const [studioQuality, setStudioQuality] = React.useState(true);
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
      <style type="text/css">
        {`
        .example {
          margin: 0;
        }

        .example > * {
          margin: 4px;
        }

        .example--themed-form-field-validation-states {
          --rui-FormField--valid--default__color: white;
          --rui-FormField--valid--default__border-color: LightSeaGreen;
          --rui-FormField--valid--default__background: MediumAquamarine;
          --rui-FormField--valid--default__check-background-color: MediumAquamarine;
          --rui-FormField--valid--default__surrounding-text-color: DarkSlateGray;
          --rui-FormField--valid--checked__check-background-color: MediumAquamarine;
        }
    `}
      </style>
      <TextField
        id="default-valid-text-field"
        label="Default valid text field"
        validationState="valid"
        validationText="This field is valid"
      />
      <SelectField
        id="default-valid-select-field"
        label="Default valid select field"
        onChange={(e) => setFruit(e.target.value)}
        options={options}
        validationState="valid"
        validationText="This field is valid"
        value={fruit}
      />
      <Radio
        id="default-valid-radio"
        label="Default valid radio"
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
        validationState="valid"
        validationText="This field is valid"
        value={fruit}
      />
      <CheckboxField
        checked={agree}
        id="default-valid-checkbox"
        label="Default valid checkbox"
        onChange={() => setAgree(!agree)}
        validationState="valid"
        validationText="This field is valid"
      />
      <Toggle
        checked={studioQuality}
        id="default-valid-toggle"
        label="Default valid toggle"
        onChange={() => setStudioQuality(!studioQuality)}
        validationState="valid"
        validationText="This field is valid"
      />
      <div className="example example--themed-form-field-validation-states mt-6">
        <TextField
          id="themed-valid-text-field"
          label="Themed valid text field"
          validationState="valid"
          validationText="This field is valid"
        />
        <SelectField
          id="themed-valid-select-field"
          label="Themed valid select field"
          onChange={(e) => setFruit(e.target.value)}
          options={options}
          validationState="valid"
          validationText="This field is valid"
          value={fruit}
        />
        <Radio
          id="themed-valid-radio"
          label="Themed valid radio"
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
          validationState="valid"
          validationText="This field is valid"
          value={fruit}
        />
        <CheckboxField
          checked={agree}
          id="themed-valid-checkbox"
          label="Themed valid checkbox"
          onChange={() => setAgree(!agree)}
          validationState="valid"
          validationText="This field is valid"
        />
        <Toggle
          onChange={() => setStudioQuality(!studioQuality)}
          checked={studioQuality}
          id="themed-valid-toggle"
          label="Themed valid toggle"
          validationState="valid"
          validationText="This field is valid"
        />
      </div>
    </React.Fragment>
  )
});
```

## Disabled State

By default, all disabled form fields are semi-transparent and change mouse
cursor on hover so users know the fields cannot be used.

| Custom Property                                      | Description                                                  |
|------------------------------------------------------|--------------------------------------------------------------|
| `--rui-FormField--disabled__cursor`                  | Cursor to show on hovering disabled form fields              |
| `--rui-FormField--disabled__opacity`                 | Opacity of disabled form fields (inc. label and help text)   |

Should your design require custom styling of disabled fields, individual field
types and validation states can be fine-tuned by several theming options
available. All you need is to define all necessary custom properties following
the naming conventions documented in previous sections (for simplicity, the
properties do not exist in the default theme, we only use transparency to mark
disabled fields by default). Namely, you will be interested in `disabled` and
`checked-disabled` interaction states and properties that are available for
styling of these states.

Example:

```docoff-react-preview
React.createElement(() => {
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
      <style type="text/css">
        {`
        .example {
          margin: 0;
        }

        .example > * {
          margin: 4px;
        }

        .example--themed-form-field-disabled-state {
          /*_Common_*/
          --rui-FormField--disabled__opacity: 1;
          /*_Check fields_*/
          --rui-FormField--check--disabled__border-color: silver;
          --rui-FormField--check--disabled__check-background-color: gainsboro;
          --rui-FormField--check--disabled__surrounding-text-color: silver;
          --rui-FormField--check--checked-disabled__border-color: silver;
          --rui-FormField--check--checked-disabled__check-background-color: gainsboro;
          /*_Outline box fields_*/
          --rui-FormField--box--outline--disabled__color: DarkGray;
          --rui-FormField--box--outline--disabled__border-color: silver;
          --rui-FormField--box--outline--disabled__background: gainsboro;
          --rui-FormField--box--outline--disabled__surrounding-text-color: silver;
          /*_Invalid state_*/
          --rui-FormField--invalid--disabled__color: DarkGray;
          --rui-FormField--invalid--disabled__border-color: silver;
          --rui-FormField--invalid--disabled__background: gainsboro;
          --rui-FormField--invalid--disabled__check-background-color: gainsboro;
          --rui-FormField--invalid--disabled__surrounding-text-color: silver;
          --rui-FormField--invalid--checked-disabled__check-background-color:
          gainsboro;
          /*_Warning state_*/
          --rui-FormField--warning--disabled__color: DarkGray;
          --rui-FormField--warning--disabled__border-color: silver;
          --rui-FormField--warning--disabled__background: gainsboro;
          --rui-FormField--warning--disabled__check-background-color: gainsboro;
          --rui-FormField--warning--disabled__surrounding-text-color: silver;
          --rui-FormField--warning--checked-disabled__check-background-color:
          gainsboro;
          /*_Valid state_*/
          --rui-FormField--valid--disabled__color: DarkGray;
          --rui-FormField--valid--disabled__border-color: silver;
          --rui-FormField--valid--disabled__background: gainsboro;
          --rui-FormField--valid--disabled__check-background-color: gainsboro;
          --rui-FormField--valid--disabled__surrounding-text-color: silver;
          --rui-FormField--valid--checked-disabled__check-background-color: gainsboro;
        }
      `}
      </style>
      <TextField
        disabled
        id="default-disabled-text-field"
        label="Default disabled text field"
      />
      <SelectField
        disabled
        id="default-disabled-select-field"
        label="Default disabled select field"
        options={options}
        value="apple"
      />
      <TextField
        disabled
        id="default-disabled-invalid-text-field"
        label="Default disabled invalid text field"
        validationState="invalid"
      />
      <Radio
        disabled
        id="default-disabled-radio"
        label="Default disabled radio"
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
        value="apple"
      />
      <CheckboxField
        checked
        disabled
        id="default-disabled-checkbox"
        label="Default disabled checkbox"
      />
      <Toggle
        checked
        disabled
        id="default-disabled-toggle"
        label="Default disabled toggle"
      />
      <CheckboxField
        disabled
        id="default-disabled-warning-checkbox"
        label="Default disabled warning checkbox"
        validationState="warning"
      />
      <Toggle
        checked
        disabled
        id="default-disabled-valid-toggle"
        label="Default disabled valid toggle"
        validationState="valid"
      />
      <div className="example example--themed-form-field-disabled-state mt-6">
        <TextField
          disabled
          id="themed-disabled-text-field"
          label="Themed disabled text field"
        />
        <SelectField
          disabled
          id="themed-disabled-select-field"
          label="Themed disabled select field"
          options={options}
          value="apple"
        />
        <TextField
          disabled
          id="themed-disabled-invalid-text-field"
          label="Themed disabled invalid text field"
          validationState="invalid"
        />
        <Radio
          disabled
          id="themed-disabled-radio"
          label="Themed disabled radio"
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
          value="apple"
        />
        <CheckboxField
          checked
          disabled
          id="themed-disabled-checkbox"
          label="Themed disabled checkbox"
        />
        <Toggle
          checked
          disabled
          id="themed-disabled-toggle"
          label="Themed disabled toggle"
        />
        <CheckboxField
          disabled
          id="themed-disabled-warning-checkbox"
          label="Themed disabled warning checkbox"
          validationState="warning"
        />
        <Toggle
          checked
          disabled
          id="themed-disabled-valid-toggle"
          label="Themed disabled valid toggle"
          validationState="valid"
        />
      </div>
    </React.Fragment>
  )
});
```
