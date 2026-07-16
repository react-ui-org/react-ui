# MultiSelectField

MultiSelectField allows users to select multiple options from a set.

## Basic Usage

To implement the MultiSelectField component, you need to import it first:

```js
import { MultiSelectField } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
React.createElement(() => {
  const [value, setValue] = React.useState(['CZ', 'SK', 'PL', 'DE', 'HU']);
  const COUNTRIES = [
    { label: 'Austria', value: 'AT' },
    { label: 'Belgium', value: 'BE', disabled: true },
    { label: 'Bulgaria', value: 'BG' },
    { label: 'Croatia', value: 'HR', disabled: true },
    { label: 'Cyprus', value: 'CY' },
    { label: 'Czech Republic', value: 'CZ' },
    { label: 'Denmark', value: 'DK' },
    { label: 'Estonia', value: 'EE' },
    { label: 'Finland', value: 'FI' },
    { label: 'France', value: 'FR' },
    { label: 'Germany', value: 'DE' },
    { label: 'Greece', value: 'GR' },
    { label: 'Hungary', value: 'HU' },
    { label: 'Ireland', value: 'IE' },
    { label: 'Italy', value: 'IT' },
    { label: 'Latvia', value: 'LV' },
    { label: 'Lithuania', value: 'LT' },
    { label: 'Luxembourg', value: 'LU' },
    { label: 'Malta', value: 'MT' },
    { label: 'Netherlands', value: 'NL' },
    { label: 'Poland', value: 'PL' },
    { label: 'Portugal', value: 'PT' },
    { label: 'Romania', value: 'RO' },
    { label: 'Slovakia', value: 'SK' },
    { label: 'Slovenia', value: 'SI' },
    { label: 'Spain', value: 'ES' },
    { label: 'Sweden', value: 'SE' }
  ];
  return (
    <>
    <MultiSelectField
      label="Select countries"
      onChange={(selectedValues) => setValue(selectedValues)}
      options={COUNTRIES}
      value={value}
      variant="outline"
    />
    <MultiSelectField
      label="Select countries"
      onChange={(selectedValues) => setValue(selectedValues)}
      options={COUNTRIES}
      value={value}
      variant="filled"
    />
    </>
  );
});
```

See [API](#api) for all available options.

## General Guidelines

- Use MultiSelectField when users should select **multiple options** from
  a set. To select just a single option, use the
  [SelectField](/components/SelectField) component instead.

- For sets of just a few options consider using a group of
  [CheckboxField](/components/CheckboxField) components. This will help keep
  your UI clean and prevent your users from being overwhelmed by too many
  options.

- Use **short and descriptive labels**, ideally nouns rather than seemingly
  polite phrases like _Please select your favourite fruits_. Short labels will
  help your users accomplish their task faster.

- Only make the MultiSelectField's label invisible when there is **another
  visual clue** to guide users through filling the input.

- When a short label is not enough, use **help texts to guide users** before
  they enter anything.

- Use **clear, calm error messages** when there's a problem with what they
  entered.

- In case of a large amount of options, consider **grouping related items
  together** by nesting them.

### Keyboard Interaction

- **Enter**, **Space**, **Arrow Up**, or **Arrow Down** opens the dropdown.
  Typing a character opens the dropdown too (when [search](#search) is
  enabled).
- **Typing** into the search input filters the displayed options (when
  [search](#search) is enabled).
- **Arrow Up** and **Arrow Down** move focus between the options.
- **Enter** or **Space** toggles selection of the focused option.
- **Delete** or **Backspace** removes a focused tag. **Backspace** in an empty
  search input moves focus to the last tag.
- **Escape** closes the dropdown and returns focus to the input.
- **Tab** moves focus through the tags and further out of the field while the
  dropdown is open.

## Design Variants

To satisfy the design requirements of your project, all input fields in React UI
come in two design variants to choose from: outline and filled. Both can be
further [customized](#theming) with CSS custom properties.

```docoff-react-preview
React.createElement(() => {
  const [fruits, setFruits] = React.useState(['apple']);
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
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        variant="filled"
        value={fruits}
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
  const [fruits, setFruits] = React.useState(['apple']);
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
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        size="small"
        value={fruits}
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        size="large"
        value={fruits}
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        size="small"
        value={fruits}
        variant="filled"
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
        variant="filled"
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        size="large"
        value={fruits}
        variant="filled"
      />
    </>
  );
});
```

Full-width fields span the full width of a parent:

```docoff-react-preview
React.createElement(() => {
  const [fruits, setFruits] = React.useState(['apple']);
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
      <MultiSelectField
        fullWidth
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
      />
      <MultiSelectField
        fullWidth
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
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
  const [crops, setCrops] = React.useState(['apple']);
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
    <MultiSelectField
      label="Your favourite crops"
      onChange={(value) => setCrops(value)}
      options={options}
      value={crops}
      variant="outline"
    />
    <MultiSelectField
      label="Your favourite crops"
      onChange={(value) => setCrops(value)}
      options={options}
      value={crops}
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
  const [fruits, setFruits] = React.useState(['apple']);
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
      <MultiSelectField
        isLabelVisible={false}
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
      />
      <MultiSelectField
        isLabelVisible={false}
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
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
  const [fruits, setFruits] = React.useState(['apple']);
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
      <MultiSelectField
        label="Your favourite fruits"
        layout="horizontal"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
      />
      <MultiSelectField
        label="Your favourite fruits"
        layout="horizontal"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
        variant="filled"
      />
      <MultiSelectField
        fullWidth
        label="Your favourite fruits"
        layout="horizontal"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
      />
      <MultiSelectField
        fullWidth
        label="Your favourite fruits"
        layout="horizontal"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
        variant="filled"
      />
      <MultiSelectField
        fullWidth
        isLabelVisible={false}
        label="Your favourite fruits"
        layout="horizontal"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
      />
      <MultiSelectField
        fullWidth
        isLabelVisible={false}
        label="Your favourite fruits"
        layout="horizontal"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
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
  const [fruits, setFruits] = React.useState(['apple']);
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
      <MultiSelectField
        helpText="Choose one or more kinds of fruit to feel happy."
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
      />
      <MultiSelectField
        helpText="Choose one or more kinds of fruit to feel happy."
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
        variant="filled"
      />
      <MultiSelectField
        helpText="Choose one or more kinds of fruit to feel happy."
        label="Your favourite fruits"
        layout="horizontal"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
      />
      <MultiSelectField
        helpText="Choose one or more kinds of fruit to feel happy."
        label="Your favourite fruits"
        layout="horizontal"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
        variant="filled"
      />
      <MultiSelectField
        fullWidth
        helpText="Choose one or more kinds of fruit to feel happy."
        label="Your favourite fruits"
        layout="horizontal"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
      />
      <MultiSelectField
        fullWidth
        helpText="Choose one or more kinds of fruit to feel happy."
        label="Your favourite fruits"
        layout="horizontal"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
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
  const [fruits, setFruits] = React.useState(['apple']);
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
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        required
        validationState="valid"
        validationText="Great, they're in stock!"
        value={fruits}
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        required
        validationState="warning"
        validationText="Oh, really?"
        value={fruits}
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        required
        validationState="invalid"
        validationText="You must select at least one kind of fruit."
        value={fruits}
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        required
        validationState="valid"
        validationText="Great, they're in stock!"
        value={fruits}
        variant="filled"
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        required
        validationState="warning"
        validationText="Oh, really?"
        value={fruits}
        variant="filled"
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        required
        value={fruits}
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
  const [fruits, setFruits] = React.useState(['apple']);
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
    <MultiSelectField
      label="Your favourite fruits"
      onChange={(value) => setFruits(value)}
      options={options}
      required
      value={fruits}
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
  const [fruits, setFruits] = React.useState(['apple']);
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
        <MultiSelectField
          label="This field is optional"
          onChange={(value) => setFruits(value)}
          options={options}
          value={fruits}
        />
        <MultiSelectField
          label="This field is optional but looks like required"
          onChange={(value) => setFruits(value)}
          options={options}
          renderAsRequired
          value={fruits}
        />
      </div>
    </React.Fragment>
  );
});
```

It renders the field as if it was required, but doesn't mark the input as
required for assistive technologies.

### Disabled State

It's possible to disable just some options or the whole input.

```docoff-react-preview
React.createElement(() => {
  const [fruits, setFruits] = React.useState(['apple']);
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
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
        variant="filled"
      />
      <MultiSelectField
        disabled
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
      />
      <MultiSelectField
        disabled
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        value={fruits}
        variant="filled"
      />
    </>
  );
})
```

## Search

The MultiSelectField component uses a search algorithm to filter the
options based on the user's input.

### Disabled search

If you want to disable the search, you can set the `searchAlgorithm` prop to `null`.

```docoff-react-preview
React.createElement(() => {
  const [fruits, setFruits] = React.useState(['apple']);
  const options = [
    {
      label: 'Ovoce',
      options: [
        {
          label: 'Jablko',
          value: 'apple',
        },
        {
          label: 'Banán',
          value: 'banana',
        },
        {
          label: 'Grep',
          value: 'grapefruit',
        },
        {
          label: 'Jahoda',
          value: 'strawberry',
        },
      ],
    },
    {
      label: 'Zelenina',
      options: [
        {
          label: 'Řepa',
          value: 'beetroot',
        },
        {
          label: 'Mrkev',
          value: 'carrot',
        },
        {
          label: 'Rajče',
          value: 'tomato',
        },
      ],
    },
  ];
  return (
    <MultiSelectField
      label="Your favourite fruits"
      onChange={(value) => setFruits(value)}
      options={options}
      searchAlgorithm={null}
      value={fruits}
    />
  );
})
```

### Provided search algorithms

The default case-insensitive, accent sensitive, prefix search algorithm is
suitable for most cases. However, you can choose from the following search
algorithms to better suit your needs:

```js
import {
  caseInsensitiveAccentInsensitivePrefixSearch,
  caseInsensitiveAccentInsensitiveSubstringSearch,
  caseInsensitiveAccentSensitivePrefixSearch,
  caseInsensitiveAccentSensitiveSubstringSearch,
} from '@react-ui-org/react-ui';
```

Provided search algorithms preserve grouping (if defined) and only filter the options
inside the groups. Empty groups are not displayed.

The following example demonstrates the use of all search algorithms:

```docoff-react-preview
React.createElement(() => {
  const [fruits, setFruits] = React.useState(['apple']);
  const options = [
    {
      label: 'Ovoce',
      options: [
        {
          label: 'Jablko',
          value: 'apple',
        },
        {
          label: 'Banán',
          value: 'banana',
        },
        {
          label: 'Grep',
          value: 'grapefruit',
        },
        {
          label: 'Jahoda',
          value: 'strawberry',
        },
      ],
    },
    {
      label: 'Zelenina',
      options: [
        {
          label: 'Řepa',
          value: 'beetroot',
        },
        {
          label: 'Mrkev',
          value: 'carrot',
        },
        {
          label: 'Rajče',
          value: 'tomato',
        },
      ],
    },
  ];
  return (
    <>
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        searchAlgorithm={caseInsensitiveAccentInsensitivePrefixSearch}
        value={fruits}
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        searchAlgorithm={caseInsensitiveAccentInsensitiveSubstringSearch}
        value={fruits}
        variant="filled"
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        searchAlgorithm={caseInsensitiveAccentSensitivePrefixSearch}
        value={fruits}
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        searchAlgorithm={caseInsensitiveAccentSensitiveSubstringSearch}
        value={fruits}
        variant="filled"
      />
    </>
  );
})
```

### Provided generic search algorithm

For advanced search, you can use `genericSearch` which accepts a custom
comparator function. `genericSearch` will do the filtering based on the result
of the comparator function, so you do not need to worry about the search
algorithm itself.

```js
import { genericSearch } from '@react-ui-org/react-ui';
```

The following example demonstrates the use of `genericSearch` with a custom
comparator function:

```docoff-react-preview
React.createElement(() => {
  const [fruits, setFruits] = React.useState(['apple']);
  const options = [
    {
      label: 'Ovoce',
      options: [
        {
          label: 'Jablko',
          value: 'apple',
        },
        {
          label: 'Banán',
          value: 'banana',
        },
        {
          label: 'Grep',
          value: 'grapefruit',
        },
        {
          label: 'Jahoda',
          value: 'strawberry',
        },
      ],
    },
    {
      label: 'Zelenina',
      options: [
        {
          label: 'Řepa',
          value: 'beetroot',
        },
        {
          label: 'Mrkev',
          value: 'carrot',
        },
        {
          label: 'Rajče',
          value: 'tomato',
        },
      ],
    },
  ];
  const customCaseSensitiveSubstringSearch = (options, searchString) => genericSearch(
    options,
    searchString,
    (optionLabel, searchValue) => optionLabel.includes(searchValue)
  );
  return (
    <MultiSelectField
      label="Your favourite fruits"
      onChange={(value) => setFruits(value)}
      options={options}
      searchAlgorithm={customCaseSensitiveSubstringSearch}
      value={fruits}
    />
  );
})
```

### Custom search algorithm

If provided search algorithms do not suit your needs, you can create your own
search algorithm. The search algorithm is a function that accepts an array of
options and a search string and returns an array of options that match the
search string.

The following example demonstrates the use of a custom search algorithm that
is case-insensitive, accent sensitive, but removes grouping:

```docoff-react-preview
React.createElement(() => {
  const [fruits, setFruits] = React.useState(['apple']);
  const options = [
    {
      label: 'Ovoce',
      options: [
        {
          label: 'Jablko',
          value: 'apple',
        },
        {
          label: 'Banán',
          value: 'banana',
        },
        {
          label: 'Grep',
          value: 'grapefruit',
        },
        {
          label: 'Jahoda',
          value: 'strawberry',
        },
      ],
    },
    {
      label: 'Zelenina',
      options: [
        {
          label: 'Řepa',
          value: 'beetroot',
        },
        {
          label: 'Mrkev',
          value: 'carrot',
        },
        {
          label: 'Rajče',
          value: 'tomato',
        },
      ],
    },
  ];
  const customFlatPrefixSearch = (options, searchString) => {
    const searchStringTransformed = searchString.toLowerCase();
    const flatOptions = options.flatMap((option) => option.options ? option.options : option);
    return flatOptions.filter((option) => option.label.toLowerCase().startsWith(searchStringTransformed));
  };
  return (
    <MultiSelectField
      label="Your favourite fruits"
      onChange={(value) => setFruits(value)}
      options={options}
      searchAlgorithm={customFlatPrefixSearch}
      value={fruits}
    />
  );
})
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't
interfere with the API of the React component and that aren't filtered out by
[`transferProps`](/docs/js-helpers/transferProps) helper are forwarded to the
`<div>` HTML element representing the input of the field. This enables making
the component interactive and helps to improve its accessibility.

👉 For the full list of supported attributes refer to:

- [`<div>` HTML element attributes][div-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}

## Forwarding ref

If you provide [ref], it is forwarded to the `<div>` HTML element representing
the input of the field.

## API

<docoff-react-props src="/components/MultiSelectField/MultiSelectField.jsx"></docoff-react-props>

## Theming

Head to [Forms Theming](/docs/customize/theming/forms) to see shared form theming
options. On top of that, the following options are available for
MultiSelectField.

| Custom Property                                                       | Description                                          |
|------------------------------------------------------------------------|------------------------------------------------------|
| `--rui-MultiSelectField__dropdown__background-color`                    | Dropdown background color                            |
| `--rui-MultiSelectField__dropdown__border-color`                        | Dropdown border color                                |
| `--rui-MultiSelectField__dropdown__box-shadow`                          | Dropdown box shadow                                  |
| `--rui-MultiSelectField__dropdown__max-height`                          | Dropdown max height                                  |
| `--rui-MultiSelectField__dropdown__z-index`                             | Dropdown z-index                                     |
| `--rui-MultiSelectField__dropdown-group__color`                         | Text color of group labels                           |
| `--rui-MultiSelectField__dropdown-group__font-weight`                   | Font weight of group labels                          |
| `--rui-MultiSelectField__dropdown-item__background-color`               | Background color of dropdown items                   |
| `--rui-MultiSelectField__dropdown-item__border-radius`                  | Corner radius of dropdown item background            |
| `--rui-MultiSelectField__dropdown-item__color`                          | Text color of dropdown items                         |
| `--rui-MultiSelectField__dropdown-item__gap`                            | Gap around dropdown item background                  |
| `--rui-MultiSelectField__dropdown-item--selected__background-color`     | Background color of selected dropdown items          |
| `--rui-MultiSelectField__dropdown-item--selected__color`                | Text color of selected dropdown items                |
| `--rui-MultiSelectField__dropdown-item--selected__font-weight`          | Font weight of selected dropdown items               |
| `--rui-MultiSelectField__dropdown-item--selected--focus__background-color` | Background color of selected dropdown items when hovered or focused |
| `--rui-MultiSelectField__dropdown-item--selected--focus__color`         | Text color of selected dropdown items when hovered or focused |
| `--rui-MultiSelectField__dropdown-item--focus__background-color`        | Background color of hovered or focused dropdown items |
| `--rui-MultiSelectField__dropdown-item--focus__color`                   | Text color of hovered or focused dropdown items      |
| `--rui-MultiSelectField__dropdown-text-item__color`                     | Text color of text items (e.g. no options found)     |
| `--rui-MultiSelectField__tag__border-width`                             | Tag border width                                     |
| `--rui-MultiSelectField__tag__border-radius`                            | Tag corner radius                                    |
| `--rui-MultiSelectField__tag__gap`                                      | Gap between the tag label and the remove icon        |
| `--rui-MultiSelectField--<VARIANT>__tag--<INTERACTION STATE>__background-color` | Tag background color                          |
| `--rui-MultiSelectField--<VARIANT>__tag--<INTERACTION STATE>__border-color`     | Tag border color                              |
| `--rui-MultiSelectField--<VARIANT>__tag--<INTERACTION STATE>__color`            | Tag text color                                |
| `--rui-MultiSelectField--<SIZE>__tag__font-size`                        | Tag font size                                        |
| `--rui-MultiSelectField--<SIZE>__tag__padding-inline`                   | Tag horizontal padding                               |

[div-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div#attributes
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
[ref]: https://reactjs.org/docs/refs-and-the-dom.html
