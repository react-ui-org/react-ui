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

- Selecting an option, by click or by keyboard, **keeps the dropdown open** and
  clears the search text, so users can select several options in a row.

### Keyboard Interaction

The field is a **single tab stop**. **Tab** and **Shift + Tab** enter and leave
the whole field, whether the dropdown is open or not. Options and tags are
reached by keys pressed in the combobox, so keyboard users never need to Tab
through them.

#### Opening and Closing

- **Arrow Down** or **Arrow Up** opens the closed dropdown and activates its
  first or last option. **Alt + Arrow Down** opens it without activating an
  option. **Enter** and **Space** open it too, unless Space types a space (see
  [Selecting](#selecting)).
- **Typing** into the search input opens the dropdown and filters the options
  when [search](#search) is enabled.
- **Escape** or **Alt + Arrow Up** closes the dropdown. The search text is
  cleared, the selection stays unchanged.

#### Moving Between Options

- **Arrow Down** and **Arrow Up** move the active option to the next or the
  previous one. They stop at the first and the last option instead of wrapping
  around. Disabled options are skipped.
- **Home** and **End** activate the first and the last option. In the search
  input they move the cursor within the search text until an option is active.
  Without search they always activate the first or the last option, and open
  the dropdown when it is closed.
- **Arrow Left** and **Arrow Right** deactivate the active option in the search
  input and leave the cursor within the search text. Without search they do
  nothing while an option is active.
- **Page Up** and **Page Down** are not supported.
- Without search, typing a character activates the next option whose label
  starts with it, like a native select does. Typing more characters keeps the
  active option while its label still starts with them, otherwise the next
  matching option is activated. Typing the same character repeatedly cycles
  through the options starting with it. Space continues a multi-word match,
  e.g. "Czech R". The match is reset after a short pause.

#### Selecting

- **Enter** and **Space** toggle the active option and keep the dropdown open,
  so more options can be selected. Without an active option, Enter does nothing
  and never submits a surrounding form. Without an active option, Space does
  nothing, so the page does not scroll.
- **Space** toggles the active option when search is disabled or the search text
  is empty. With search enabled and text typed, Space types a space instead.
- Selecting an option clears the search text, the selected option stays active.

#### Tags

- **Backspace** in an empty search input moves focus to the last tag. Without
  search, Backspace does this at any time. Moving to the tags closes the
  dropdown.
- **Arrow Left** moves focus to the last tag when no option is active and the
  cursor is at the start of the search text. Without search, the cursor position
  does not matter.
- In a tag, **Arrow Left** and **Arrow Right** move to the previous and the next
  tag. They stop at the first and the last tag instead of wrapping around.
  **Arrow Right** on the last tag returns focus to the combobox, with the cursor
  at the start of the search text. **Home** and **End** move to the first and
  the last tag.
- In a tag, **Delete** or **Backspace** removes the tag. Focus moves to the
  previous tag, or to the next one when the first tag was removed, or to the
  combobox when no tags remain.
- In a tag, **Escape** returns focus to the combobox. **Arrow Down** and
  **Arrow Up** open the dropdown and activate its first or last option.
- In a tag, printable characters become the search text. Without search, they
  start type-ahead instead. **Space** opens the dropdown instead of typing a
  space. Keys with a modifier, e.g. **Alt + Arrow Left**, are left to the
  browser. **Tab** and **Shift + Tab** leave the field.

## Design Variants

To satisfy the design requirements of your project, all input fields in React UI
come in two design variants to choose from: outline and filled. Both can be
further customized with CSS custom properties.

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
them. The groups are rendered as labelled option groups of the dropdown.

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
        state="valid"
        validationText="Great, they're in stock!"
        value={fruits}
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        required
        state="warning"
        validationText="Oh, really?"
        value={fruits}
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        required
        state="invalid"
        validationText="You must select at least one kind of fruit."
        value={fruits}
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        required
        state="valid"
        validationText="Great, they're in stock!"
        value={fruits}
        variant="filled"
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        required
        state="warning"
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
        state="invalid"
        validationText="You must select at least one kind of fruit."
        variant="filled"
      />
    </>
  );
})
```

### Changed State

Changed state highlights fields whose value differs from the saved one, so users
can review their edits before saving.

A field shows one state at a time. When a changed value is also invalid, it's
up to you to pick the state that matters more to the user.

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
        state="changed"
        value={fruits}
      />
      <MultiSelectField
        label="Your favourite fruits"
        onChange={(value) => setFruits(value)}
        options={options}
        state="changed"
        value={fruits}
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

All form fields in React UI can be styled to indicate the required state.

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
element with the `combobox` role: the `<input>` HTML element, or the `<div>` HTML
element when [search](#search) is disabled. This enables making
the component interactive and helps to improve its accessibility. When search
is enabled, attributes such as `name` land on the native `<input>` element, so
a `name` would submit the search text with a surrounding form. Event handlers
`onClick` and `onKeyDown` are called before the component handles the event,
and the component does not handle it when the handler calls
`preventDefault()`. Attributes the component manages itself, such as `role`,
`aria-expanded` or `aria-labelledby`, cannot be overridden.

👉 For the full list of supported attributes refer to:

- [`<input>` HTML element attributes][input-attributes]{:target="_blank"}
- [`<div>` HTML element attributes][div-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}

## Forwarding ref

If you provide [ref], it is forwarded to the element with the `combobox` role:
the `<input>` HTML element, or the `<div>` HTML element when [search](#search)
is disabled.

## API

<docoff-react-props src="/components/MultiSelectField/MultiSelectField.tsx" name="MultiSelectField"></docoff-react-props>

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
[input-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
[ref]: https://reactjs.org/docs/refs-and-the-dom.html
