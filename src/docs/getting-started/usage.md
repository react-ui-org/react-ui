# Usage

## Responsive Meta Tag

React UI is designed and developed mobile-first, a strategy in which we first
write code for mobile devices, and then scale up components as necessary using
CSS media queries. To ensure proper rendering and touch zooming for all devices,
add the responsive viewport meta tag to your `<head>` element:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

## Fonts

React UI is designed with the Titillium Web font. Add it to your project e.g. via
Google Fonts in your `<head>` element:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;700&display=swap"
  rel="stylesheet"
/>
```

Remember to include all necessary font weights (and only them — for better
performance).

## CSS

React UI honors [ITCSS][itcss] principles to make sure that its CSS code base
will work and perform well even in large scale. There are three global CSS
layers:

1. **Theme:** a collection of hundreds of CSS custom properties that define the
   look of your app. See [Theming][theming] for more.
2. **Foundation:** mandatory ground-zero CSS for React UI components. Includes
   global resets and fixes rendering inconsistencies across browsers with
   `normalize.css`. (Not to be confused with the Foundation CSS framework.)
3. **CSS helpers:** tiny CSS classes that can handle details like
   [typography][typography], [spacing][spacing], [colors][colors], etc. Class
   name notation is [inspired by Bootstrap][bootstrap-utilities], so if you are
   familiar with Bootstrap, you will feel at home here.

All layers are written in Sass and compiled to CSS. You can import them in a
**ready-to-use CSS bundle** like this:

```js
import '@react-ui-org/react-ui/dist/react-ui.css';
```

### Sass

Alternatively, you can import the Sass source files directly:

```js
import '@react-ui-org/react-ui/src/theme.scss';
import '@react-ui-org/react-ui/src/foundation.scss';
import '@react-ui-org/react-ui/src/helpers.scss';
```

## Components

Import and use any of React UI components in your app:

```jsx
import { Button } from '@react-ui-org/react-ui';

<Button label="My Button" />
```

👉 Thanks to [CSS modules], React UI components have their styles bundled
together with the component code.

### Controlled vs. Uncontrolled

While you may find out some components are working for you as uncontrolled, we
currently support only [controlled components][controlled-components].

## Full Example

Example HTML:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React UI Example</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;700&display=swap"
      rel="stylesheet"
    />
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

[itcss]: https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/
[theming]: /docs/customize/theming/overview
[controlled-components]: https://reactjs.org/docs/forms.html#controlled-components
[typography]: /docs/css-helpers/typography
[spacing]: /docs/css-helpers/spacing
[colors]: /docs/css-helpers/colors
[bootstrap-utilities]: https://getbootstrap.com/docs/5.1/utilities/
[CSS modules]: https://github.com/css-modules/css-modules
