# TextLink

TextLink allows users to follow navigation.

## Basic Usage

To implement the TextLink component, you need to import it first:

```js
import { TextLink } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<TextLink
  href="/docs/contribute/general-guidelines"
  label="How can I contribute to React UI?"
/>
```

See [API](#api) for all available options.

## General Guidelines

**Avoid using links for actions**, use a [Button](/components/Button/)
instead. This is because users expect navigation to happen when clicking on
something what looks like a link.

## Custom Routing

It's common to use custom function for routing within SPAs. Use the
`onClick` option to provide such function.

```docoff-react-preview
<TextLink
  href="/docs/contribute/general-guidelines"
  label="This link is controlled by custom function"
  onClick={(event) => {
    event.preventDefault();
    alert('You will be redirected.')
    window.location = event.currentTarget.getAttribute('href');
  }}
/>
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify [React synthetic events] or **any HTML attribute you like.** All
attributes that don't interfere with the API are forwarded to the `<a>` HTML
element. This enables making the component interactive and helps to improve its
accessibility.

👉 Refer to the MDN reference for the full list of supported attributes of the
[a] element.

## API

<docoff-react-props src="/components/TextLink/TextLink.jsx"></docoff-react-props>

## Theming

| Custom Property                           | Description                         |
|-------------------------------------------|-------------------------------------|
| `--rui-TextLink__color`                   | Text color                          |
| `--rui-TextLink__text-decoration`         | Text decoration, e.g. underline     |
| `--rui-TextLink--hover__color`            | Text color on hover                 |
| `--rui-TextLink--hover__text-decoration`  | Text decoration on hover            |
| `--rui-TextLink--active__color`           | Text color in the active state      |
| `--rui-TextLink--active__text-decoration` | Text decoration in the active state |

[React synthetic events]: https://reactjs.org/docs/events.html
[a]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attributes
