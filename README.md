# React UI

![npm](https://img.shields.io/npm/v/@react-ui-org/react-ui)
![David](https://img.shields.io/david/react-ui-org/react-ui)
![Build and run tests](https://github.com/react-ui-org/react-ui/workflows/Build%20and%20run%20tests/badge.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/@react-ui-org/react-ui)

> React components for your design system.

React UI is a themeable, performant, responsive UI library for React apps.
Use it simply with no configuration or have full control over your design by
tweaking some of the hundreds theming options available.

**[Explore React UI docs →](https://react-ui.io)**

## Key Concepts

Why another UI library? Because we couldn't find any library that would meet
these requirements:

- **🎨 Full control over design, from design tokens to components.** Hundreds of
  CSS custom properties allow you to customize the design of your app without
  touching JS.

- **📦 Smart defaults, out of the box.** Create rapid prototypes that look great
  with no additional effort.

- **🚀 Small bundle size.** Because performance matters.

## Quick Start Guide

To install React UI in your app:

1. Install `react-ui` with npm. Make sure you also have `prop-types`, `react` and
  `react-dom` installed.

   ```bash
   npm install --save @react-ui-org/react-ui
   ```

2. Load the Titillium Web font:

   ```html
   <link
     href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700&display=swap"
     rel="stylesheet"
   />
   ```

3. Load the default theme and the CSS foundation layer:

   <!-- eslint-env browser -->
   <!-- eslint-disable import/no-unresolved -->

   ```js
   import '@react-ui-org/react-ui/src/lib/theme.scss';
   import '@react-ui-org/react-ui/src/lib/foundation.scss';
   ```

   <!-- eslint-env browser -->

4. Import and use any of React UI components in your app:

   ```jsx
   import { Button } from '@react-ui-org/react-ui';

   <Button label="My Button" />
   ```

Head to [the docs](https://react-ui.io) to see how to use, customize, and
extend React UI.

### Development Mode

It is possible to run React UI in your app in development mode. This is useful
because:

- In production mode React UI uses non-human-readable class names.
- Runtime check (i.e. PropTypes) are suppressed in production mode.

To enable development mode, add the following code to the `webpack.config.js`
file in your app:

```js
module.exports = (env, argv) => ({
  resolve: {
    alias: {
      // Allow to run react-ui in development mode for easier development.
      '@react-ui-org/react-ui$': argv.mode === 'production'
        ? '@react-ui-org/react-ui/dist/lib.js'
        : '@react-ui-org/react-ui/dist/lib.development.js',
    },
  },
});
```

Then run webpack with the `--mode=production` or `--mode=development` flag.

## Sponsors

<p>
    <br />
    <a href="https://www.racom.eu">
      <img src="public/racom.svg" width="190" height="30" alt="RACOM" />
    </a>
    <br />
    <br />
</p>

> Development of React UI is largely supported by
> [RACOM](https://www.racom.eu)—one of the leading global players in wireless
> Critical Infrastructure.

## Contributing

We appreciate any contributions you might make. 🙏

Please check out our
[Contributing Guide](https://react-ui.io/contribute/guidelines). It includes
contribution guidelines and information on how to run and develop the project.
