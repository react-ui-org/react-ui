# Badge

## Basic Usage

To implement the Badge component, you need to import it first:

```js
import { Badge } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<Badge label="Hello!" />
```

See [API](#api) for all available options.

## General Guidelines

Use badges to highlight content with a **short and brief** additional
information: a number, a word, but no more than two words.

## Priorities

There are two **visual priorities** of badges to choose from, from highest to
lowest:

1. filled
2. outline

All priorities are available in colors from supported
[color collections](/docs/foundation/collections#colors).
Check [API](#api) to see which collections are supported.

### Filled

High-emphasis priority to draw user's attention.

```docoff-react-preview
<Badge label="3" color="success" />
<Badge label="4" color="warning" />
<Badge label="5" color="danger" />
<Badge label="10" color="help" />
<Badge label="34" color="info" />
<Badge label="99+" />
<Badge label="365" color="light" />
<Badge label="999+" color="dark" />
```

```docoff-react-preview
<Badge label="Success" color="success" />
<Badge label="Warning" color="warning" />
<Badge label="Danger" color="danger" />
<Badge label="Help" color="help" />
<Badge label="Info" color="info" />
<Badge label="Note" />
<Badge label="Light" color="light" />
<Badge label="Dark" color="dark" />
```

### Outline

Medium-emphasis priority to provide additional context in an unobtrusive way.

```docoff-react-preview
<Badge priority="outline" label="3" color="success" />
<Badge priority="outline" label="4" color="warning" />
<Badge priority="outline" label="5" color="danger" />
<Badge priority="outline" label="10" color="help" />
<Badge priority="outline" label="34" color="info" />
<Badge priority="outline" label="99+" />
<Badge priority="outline" label="365" color="light" />
<Badge priority="outline" label="999+" color="dark" />
```

```docoff-react-preview
<Badge priority="outline" label="Success" color="success" />
<Badge priority="outline" label="Warning" color="warning" />
<Badge priority="outline" label="Danger" color="danger" />
<Badge priority="outline" label="Help" color="help" />
<Badge priority="outline" label="Info" color="info" />
<Badge priority="outline" label="Note" />
<Badge priority="outline" label="Light" color="light" />
<Badge priority="outline" label="Dark" color="dark" />
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

<docoff-react-props src="/components/Badge/Badge.jsx" />

## Theming

It's possible to adjust the theme of specific badge color variant. Naming
convention looks as follows:

`--rui-Badge--<PRIORITY>--<COLOR>__<PROPERTY>`

Where:

- `<PRIORITY>` is one of `filled` or `outline`,
- `<COLOR>` is a value from supported
  [color collections](/docs/foundation/collections#colors)
  (check [API](#api) to see which collections are supported),
- `<PROPERTY>` is one of `color` (color of text) or `background-color` for the
  filled priority, or just `color` for the outline priority.

[div-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div#attributes
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
