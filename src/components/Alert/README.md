# Alert

Alert presents feedback or important information to users.

## Basic Usage

To implement the Alert component, you need to import it first:

```js
import { Alert } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<Alert>
  <strong>Hello!</strong> This is an alert.
</Alert>
```

See [API](#api) for all available options.

## General Guidelines

- **Be simple and short** and explain to users why you are interrupting them
  with an alert. Clearly say what happened or what is going to happen. Provide a
  brief title when the message is too long.

- **Use icons** to improve the accessibility of alerts because color may not be
  enough for everyone. [See how](#alerts-with-icons).

## Color Variants

All [component colors](/docs/foundation/colors#component-colors) are supported by
alert to cover all possible needs of your project.

### Success

Success alerts confirm that an operation has been processed successfully.

```docoff-react-preview
<Alert color="success">
  <strong>Success:</strong> Settings have been successfully saved.
</Alert>
```

### Warning

Use warning alerts when a potentially unfavourable situation may occur. You may
suggest an action to resolve the problem.

```docoff-react-preview
<Alert color="warning">
  <strong>Warning:</strong> Your credit card is going to expire soon.
  {' '}
  <a href="/">Update my payment options</a>
</Alert>
```

### Danger

Danger alerts say there is something that block users from continuing that
requires their immediate attention. The alert should offer a solution to the
problem.

```docoff-react-preview
<Alert color="danger">
  <strong>Error:</strong> Cannot connect to the server. Is your internet
  connection working fine?
  {' '}
  <a href="/">Try again</a>
</Alert>
```

### Help

This kind of alert can be used to display helpful information.

```docoff-react-preview
<Alert color="help">
  <strong>Help:</strong> You should choose a password you don&apos;t use
  anywhere else.
</Alert>
```

### Info

Another common, informative alert.

```docoff-react-preview
<Alert color="info">
  <strong>Info:</strong> This feature depends on user&apos;s OS preferences.
</Alert>
```

### Note (Default)

Neutral informative alert.

```docoff-react-preview
<Alert>
  <strong>Note:</strong> This feature may not be available in all regions.
</Alert>
```

### Light

Light alert variant.

```docoff-react-preview
<docoff-placeholder dark>
  <Alert color="light">
    <strong>Light alert:</strong> Stands out on dark backgrounds.
  </Alert>
</docoff-placeholder>
```

### Dark

Dark alert variant.

```docoff-react-preview
<Alert color="dark">
  <strong>Dark alert:</strong> Stands out on light backgrounds.
</Alert>
```

## Alerts with Icons

An icon can (and should) accompany the message.

👉 Please note there are no icons pre-packed in React UI. Visit
[Icons](/docs/foundation/icons) to see how it works.

```docoff-react-preview
<Alert color="success" icon={<rui-icon icon="success" />}>
  <strong>Success:</strong> Settings have been successfully saved.
</Alert>
```

## Dismissible Alerts

You can make an alert dismissible by providing a function that closes it on
click on the close button:

```docoff-react-preview
React.createElement(() => {
  const [isAlertVisible, setIsAlertVisible] = React.useState(true);

  if (isAlertVisible) {
    return (
      <Alert
        color="success"
        icon={<rui-icon icon="success" />}
        onClose={() => setIsAlertVisible(false)}
      >
        <strong>Success:</strong> Settings have been successfully saved.
      </Alert>
    );
  }

  return (
    <Button
      label="Bring the alert back!"
      onClick={() => setIsAlertVisible(true)}
    />
  );
});
```

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't interfere
with the API of the React component are forwarded to the root `<div>` HTML
element. This enables making the component interactive and helps to improve
its accessibility.

👉 For forwarding HTML attributes programmatically, you can use the `transferProps` function. For detailed usage examples, refer to the [TransferProps documentation](/src/docs/js-helpers/transferProps.md).

For the full list of supported attributes, you can also refer to:

- [`<div>` HTML element attributes][div-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}


## API

<docoff-react-props src="/components/Alert/Alert.jsx" />

## Theming

### Common Theming Options

| Custom Property                                      | Description                                                  |
|------------------------------------------------------|--------------------------------------------------------------|
| `--rui-Alert__padding`                               | Padding between border and message                           |
| `--rui-Alert__font-weight`                           | Message font weight                                          |
| `--rui-Alert__border-width`                          | Border width                                                 |
| `--rui-Alert__border-radius`                         | Corner radius                                                |
| `--rui-Alert__emphasis__font-weight`                 | Font weight of text emphasised with `<strong>`               |
| `--rui-Alert__stripe__width`                         | Width of the border at the start of the Alert                |

### Theming Variants

It's possible to adjust the theme of specific alert color variant. Naming
convention looks as follows:

`--rui-Alert--<COLOR>__<PROPERTY>`

Where:

- `<COLOR>` is one of supported
  [component colors](/docs/foundation/colors#component-colors)
  (see alert [color variants](#color-variants) and [API](#api)),
- `<PROPERTY>` is one of `color` (color of text), `foreground-color` (color of
  border, icon, links, and emphasis), or `background-color`.

[div-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div#attributes
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
