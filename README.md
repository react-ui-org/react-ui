# React UI

![npm](https://img.shields.io/npm/v/@react-ui-org/react-ui)
![David](https://img.shields.io/david/react-ui-org/react-ui)
![Build and run tests](https://github.com/react-ui-org/react-ui/workflows/Build%20and%20run%20tests/badge.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/@react-ui-org/react-ui)

> React UI is a themeable UI library for React apps.

## Quick Start Guide

To install React UI in your app:

1. Install `react-ui` with npm. Make sure you also have `react` and
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

## Translations

Structure of translations can be found in file
`src/lib/translation/TranslationContext.jsx`. You can use
`TranslationProvider` component and pass translated structure from this file
into `TranslationProvider` as `translations` props to overwrite default
translations.

Second option is to overwrite translations locally using `translations` props of
specific component.

## Contributing

To build the project:

1. Install local npm packages: `npm install`
2. Run the build: `npm run build`

To run the dev server:

1. Install local npm packages: `npm install`
2. Run the dev server (usually on `http://localhost:3000`): `npm start`

To publish the new version:

1. Update version in `package.json` and `package-lock.json` files
2. Commit changes: `git commit -m "Bump version to X.Y.Z"`
3. Create new tag: `git tag -a vX.Y.Z -m "vX.Y.Z"`
4. Push new tag: `git push --tags`
5. Publish new version on npm: `npm publish --access public`

### Package Linking

The best way for development of React UI is to link `react-ui` into your
application with `npm link`.

1. In React UI repository, run `npm link`
2. In your application, run `npm link @react-ui-org/react-ui`

To prevent
[Invalid Hook Call Warning](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react)
when React UI is linked, add following code to Webpack configuration of your
client:

```js
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
};
```

### Documenting

We use [Docz](https://docz.site) (powered by [Gatsby](https://www.gatsbyjs.com))
as the documentation platform. The documentation itself is written in
[MDX](https://mdxjs.com) format — a human-readable blend of the popular Markdown
and JSX syntax.

Run `npm start` to run the docs in development mode, and open
`http://localhost:3000` in your browser to see the docs in live-reload mode.

A few things to note:

- In order to get component props parsed and rendered by Docz, it's crucial to
  **import the component into an MDX file right from its source file** — parsing
  a re-exported component (typically via `index.js`) isn't currently supported.

- If you don't want Gatsby to collect **anonymous statistics**, you may want to
  disable [Gatsby telemetry](https://www.gatsbyjs.com/docs/telemetry/) by
  running `npx gatsby telemetry --disable`.

- If you see the Not found page after having **changed the configuration of Docz
  or Gatsby in the live-reload mode,** you may either restart the Docz
  development server (`ctrl + c` and `npm start`), or try to edit an MDX file
  which makes the Docz rebuild, too.

- To **make your authoring experience better,** we recommend to make sure your
  IDE understands the MDX syntax and is able to help you wrap lines in MD and
  MDX files automatically (Jetbrains IDE's and VSCode support both features
  out-of-the-box or through a plugin).
