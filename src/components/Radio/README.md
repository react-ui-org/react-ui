# Radio

Radio allows users to select one option from a set.

## Basic Usage

To implement the Radio component, you need to import it first:

```js
import { Radio } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
React.createElement(() => {
  const [fruit, setFruit] = React.useState('apple');
  return (
    <Radio
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
})
```

See [API](#api) for all available options.

## General Guidelines

- Use Radio for **just a few options**. For larger sets of many options (say 4
  and more) consider using the [SelectField](/components/SelectField)
  component. This will help keep your UI clean and uncluttered and prevent your
  users from being overwhelmed by too many options.

- **Don't use for boolean** (true/false) selection or to toggle things on and
  off. [CheckboxField](/components/CheckboxField) and
  [Toggle](/components/Toggle) are more suitable for such cases.

- Use **short and descriptive labels**, ideally nouns rather than seemingly
  polite phrases like _Please select your favourite fruit_. Short labels will
  help your users accomplish their task faster.

- Only make the Radio's label invisible when there is **another visual
  clue** to guide users through filling the input.

- When a short label is not enough, use **help texts to guide users** before
  they enter anything.

- Use **clear, calm error messages** when there's a problem with what they
  entered.

- In the background, Radio uses the [`fieldset`][fieldset] element. Not only it
  improves the [accessibility] of the group, it also allows you to make use of
  its built-in features like disabling all nested inputs or pairing the group
  with a form outside. Consult [the MDN docs][fieldset] to learn more.

📖 [Read more about checkboxes and radios at Nielsen Norman Group.][nng-radio]

## Invisible Label

While it may be acceptable for login screens with just a few fields or for other
simple forms, it's dangerous to hide labels from users in most cases. Keep in
mind you should **provide another visual clue** so users know what to fill into
the input.

```docoff-react-preview
React.createElement(() => {
  const [frequency, setFrequency] = React.useState('weekly');
  return (
    <Radio
      isLabelVisible={false}
      label="Newsletter frequency"
      onChange={(e) => setFrequency(e.target.value)}
      options={[
        {
          label: 'I want to subscribe to the weekly newsletter',
          value: 'weekly',
        },
        {
          label: 'I want to subscribe to the monthly newsletter',
          value: 'monthly',
        },
        {
          label: "I don't wish to receive anything",
          value: 'never',
        },
      ]}
      value={frequency}
    />
  );
})
```

## Horizontal Layout

The default vertical layout is very easy to use and work with. However, there
are situations where horizontal layout suits better — and that's why React UI
supports this kind of layout as well.

```docoff-react-preview
React.createElement(() => {
  const [frequency, setFrequency] = React.useState('weekly');
  return (
    <Radio
      label="Newsletter frequency"
      layout="horizontal"
      onChange={(e) => setFrequency(e.target.value)}
      options={[
        {
          label: 'I want to subscribe to the weekly newsletter',
          value: 'weekly',
        },
        {
          label: 'I want to subscribe to the monthly newsletter',
          value: 'monthly',
        },
        {
          label: "I don't wish to receive anything",
          value: 'never',
        },
      ]}
      value={frequency}
    />
  );
})
```

## Help Text

You may provide an additional help text to clarify how the input should be
filled.

```docoff-react-preview
React.createElement(() => {
  const [fruit, setFruit] = React.useState('apple');
  return (
    <Radio
      helpText="What do you prefer?"
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
})
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
        <Radio
          label="Your favourite fruit"
          onChange={(e) => setFruit(e.target.value)}
          options={options}
          required
          validationState="valid"
          validationText="Great, they're in stock!"
          value={fruit}
        />
        <Radio
          label="Your favourite fruit"
          onChange={(e) => setFruit(e.target.value)}
          options={options}
          required
          validationState="warning"
          validationText="Oh, really?"
          value={fruit}
        />
        <Radio
          label="Your favourite fruit"
          onChange={(e) => setFruit(e.target.value)}
          options={options}
          required
          validationState="invalid"
          validationText="You must select one kind of fruit."
          value={fruit}
        />
      </>
    );
  })
```

### Disabled State

It's possible to disable just some options or the whole set.

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
        disabled: true,
        label: 'Grapefruit',
        value: 'grapefruit',
      },
    ];
    return (
      <>
        <Radio
          label="Your favourite fruit"
          onChange={(e) => setFruit(e.target.value)}
          options={options}
          value={fruit}
        />
        <Radio
          disabled
          label="Your favourite fruit"
          onChange={(e) => setFruit(e.target.value)}
          options={options}
          value="apple"
        />
      </>
    );
  })
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify [React synthetic events] or you can **add whatever HTML attribute
you like.** All attributes that don't interfere with the API are forwarded to
the native HTML `<input>`. This enables making the component interactive and helps
to improve its accessibility.

👉 Refer to the MDN reference for the full list of supported attributes of the
[radio] input type.

## API

<docoff-react-props src="/components/Radio/Radio.jsx"></docoff-react-props>

## Theming

Head to [Forms Theming](/docs/customize/theming/forms) to see shared form theming
options. On top of that, the following options are available for Radio.

| Custom Property                                                    | Description                                    |
|--------------------------------------------------------------------|------------------------------------------------|
| `--rui-FormField--check__input--radio__border-radius`              | Input corner radius                            |
| `--rui-FormField--check__input--radio--checked__background-image` | Checked input background image (inline, URL, …) |

[nng-radio]: https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/
[fieldset]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
[accessibility]: https://www.w3.org/WAI/tutorials/forms/grouping/
[React synthetic events]: https://reactjs.org/docs/events.html
[radio]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#additional_attributes
