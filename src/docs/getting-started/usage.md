# Usage

## Responsive Meta Tag

React UI is designed and developed mobile-first, a strategy in which we first
write code for mobile devices, and then scale up components as necessary using
CSS media queries. To ensure proper rendering and touch zooming for all devices,
add the responsive viewport meta tag to your `<head>` element:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

## CSS

React UI styles are written in Sass and compiled to CSS. You can import them
in a **ready-to-use CSS bundle** like this:

```js
import '@react-ui-org/react-ui/dist/react-ui.css';
```

Under the hood, there are several CSS layers:

1. **Layers definition:** establish [CSS cascade layers].
2. **Theme:** a collection of hundreds of [design tokens] that define the look
   and feel of your app. See [Theming] for more.
3. **Foundation:** mandatory ground-zero CSS for React UI components. Includes
   global resets and fixes rendering inconsistencies across browsers with
   `normalize.css`. (Not to be confused with the Foundation CSS framework!)
4. **Components:** React UI components' styles. Components utilize [CSS modules]
   to avoid class name conflicts and to keep the class names scoped.
5. **CSS helpers:** tiny CSS classes (helpers and utilities) that can handle
   details like [typography], [spacing], [colors], etc. Class name notation is
   [inspired by Bootstrap utilities][bootstrap-utilities], so if you are
   familiar with Bootstrap, you will feel at home here.

### Sass

👉 As of now, we don't provide a way to import the Sass files directly.

## Components

Import and use any of React UI components in your app:

```jsx
import { Button } from '@react-ui-org/react-ui';

<Button label="My Button" />
```

### Controlled vs. Uncontrolled

While you may find out some components are working for you as uncontrolled, we
currently support only [controlled components].

## Full Example

Example HTML:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React UI Example</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="app.js"></script>
  </body>
</html>
```

Example JSX:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@react-ui-org/react-ui';
import '@react-ui-org/react-ui/dist/react-ui.css';

const App = () => (
  <Button label="My Button" />
);

ReactDOM.render(<App />, document.querySelector('#app'));
```

## CDN

React UI is also available on CDN:

| Description | URL                                                                            |
|-------------|--------------------------------------------------------------------------------|
| CSS         | `https://cdn.jsdelivr.net/npm/@react-ui-org/react-ui@latest/dist/react-ui.css` |
| JS          | `https://cdn.jsdelivr.net/npm/@react-ui-org/react-ui@latest/dist/react-ui.js`  |

👉 Consider using a specific version instead of `latest` in production.

[CSS cascade layers]: /docs/contribute/css#cascade-layers
[design tokens]: /docs/foundation/design-tokens
[Theming]: /docs/customize/theming/overview
[CSS modules]: /docs/contribute/css#css-modules
[typography]: /docs/css-helpers/typography
[spacing]: /docs/css-helpers/spacing
[colors]: /docs/css-helpers/colors
[bootstrap-utilities]: https://getbootstrap.com/docs/5.3/utilities/api/
[controlled components]: https://reactjs.org/docs/forms.html#controlled-components
