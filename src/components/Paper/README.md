# Paper

Paper is a basic surface to hold content.

## Basic Usage

To implement the Paper component, you need to import it first:

```js
import { Paper } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<Paper>
  Hello!
</Paper>
```

See [API](#api) for all available options.

## General Guidelines

- Paper is **designed for non-white background.** You may want to either use its
  [raised variant](#raised-paper) or [customize](/docs/customize/theming/overview)
  the default appearance to make it stand out on white background.

- **Paper, or Card?** Paper is a basic surface to put content on. However,
  there is also the [Card](/components/Card) component. While Paper is
  usually used to hold larger content areas like lists, grids, or forms, Card is
  designed for displaying items. Card also supports more visual options.

## Raised Paper

Add optional shadow to lift the paper above background.

```docoff-react-preview
<Paper raised>
  Hello! I&apos;m paper and I&apos;m raised.
</Paper>
```

## Muted Paper

Dim background and add transparency to visually suppress the Paper.

```docoff-react-preview
<Paper muted>
  Sssh! I&apos;m paper and I&apos;m muted.
</Paper>
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't interfere
with the API of the React component are forwarded to the root `<div>` HTML
element. This enables making the component interactive and helps to improve
its accessibility.

👉 For the full list of supported attributes refer to:

- [`<div>` HTML element attributes][div-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}

## API

<docoff-react-props src="/components/Paper/Paper.jsx"></docoff-react-props>

## Theming

| Custom Property                                      | Description                                                  |
|------------------------------------------------------|--------------------------------------------------------------|
| `--rui-Paper__padding`                               | Padding of Paper                                             |
| `--rui-Paper__border-width`                          | Border width                                                 |
| `--rui-Paper__border-color`                          | Border color                                                 |
| `--rui-Paper__border-radius`                         | Corner radius                                                |
| `--rui-Paper__background-color`                      | Paper background color                                       |
| `--rui-Paper--muted__background-color`               | Background color of muted paper                              |
| `--rui-Paper--muted__opacity`                        | Opacity of muted paper                                       |
| `--rui-Paper--raised__box-shadow`                    | Box shadow of raised paper                                   |

[div-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div#attributes
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
