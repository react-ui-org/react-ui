# React UI

![npm](https://img.shields.io/npm/v/@react-ui-org/react-ui)
![David](https://img.shields.io/david/react-ui-org/react-ui)
![Build and run tests](https://github.com/react-ui-org/react-ui/workflows/Build%20and%20run%20tests/badge.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/@react-ui-org/react-ui)

> React UI is a themeable UI library for React.js apps.

React UI consists of the following building blocks:

1. **Foundation styles:** basic themeable CSS layer. **Mandatory ground zero for components.**
2. **Components:** reusable and themeable React components.
3. **Theme:** visual appearance of the UI, adjustable with CSS custom properties.
4. **Utility styles (optional):** tiny CSS classes to handle details like typography, margins etc.

## Quick Start Guide

To use React UI in your app:

1. Install `react` and `react-dom` in your application with `$ npm install --save react react-dom`
2. Install `react-ui` with `$ npm install --save @react-ui-org/react-ui`.
3. First import the **theme layer** to the topmost level of your React app.
   Either use the bundled theme as is:
   ```js
   // app.jsx
   import '@react-ui-org/react-ui/src/lib/theme.scss';
   ```
   or use it as a foundation to create your custom theme (see Theming for more):
   ```js
   // app.jsx
   import './my-custom-theme.scss';
   ```
   ⚠️ As of now, you will need **working SASS pipeline** for this to work.
   This is to be changed to ready-to-use CSS in the future.

   ℹ️ Technically it is possible to import the theme layer anywhere later in the app.
   But it's a nice habit to declare variables before using them and that's what we are doing here.
4. Add React UI **foundation styles**, the ground-zero CSS for React UI components:
   ```js
   // app.jsx
   import '@react-ui-org/react-ui/src/lib/theme.scss';
   import '@react-ui-org/react-ui/src/lib/foundation.scss';
   ```
5. Optionally add the **helper and utility classes** bundles:
   ```js
   // app.jsx
   import '@react-ui-org/react-ui/src/lib/theme.scss';
   import '@react-ui-org/react-ui/src/lib/foundation.scss';
   import '@react-ui-org/react-ui/src/lib/helpers.scss';
   import '@react-ui-org/react-ui/src/lib/utilities.scss';
   ```
6. Finally, use React UI **components** just like you are used to:
   ```js
   // MyDashboardScreen.jsx
   import React from 'react';
   import { Button } from '@react-ui-org/react-ui';

   export const MyDashboardScreen = () => (
     <Button
       clickHandler={() => {}}
       label="Save changes"
     />
   );
   ```

## Theming

**CSS custom properties** are used to define common visual properties like colors, fonts, borders,
shadows, spacing, etc. It is also possible to adjust selected properties of individual components.
See the [default theme](src/lib/theme.scss) for the full list of available settings.

️ℹ️ Please note that **breakpoint values are exported as read-only** since CSS custom properties
[cannot be used within media queries](https://www.w3.org/TR/css-variables-1/#using-variables)
(because media query is not a CSS property).

ℹ️ Please note that CSS custom properties are only supported by modern browsers.
Refer to [caniuse.com](https://caniuse.com/#feat=css-variables) for compatibility overview.

### Theming Options
With output size in mind, we recommend to choose from these theming options:

- use the default theme and override just selected settings in your app — useful for tiny adjustments
- copy the default theme to your app and change whatever is needed — useful for major visual changes

## Extending

To keep your app UI consistent, use the theme properties from `src/lib/theme.scss` also in your
custom styles.

Icons are not included in the library to allow more flexibility and to reduce its size. Components
that require icons allow to them to be passed in via props.

## Translations

Structure of translations can be found in file `src/lib/translation/TranslationContext.jsx`.
You can use `TranslationProvider` component and pass translated structure from this file into
`TranslationProvider` as `translations` props to overwrite default translations.

Second option is to overwrite translations locally using `translations` props of specific component.

## Contributing

To build the project:

1. Install local npm packages: `$ npm install`
2. Run the build: `$ npm run build`

To run the dev server:

1. Install local npm packages: `$ npm install`
2. Run the dev server (usually on `http://localhost:8080`): `$ npm start`

To publish the new version:

1. Update version in `package.json` and `package-lock.json` files
2. Commit changes: `git commit -m "Bump version vX.Y.Z"`
3. Create new tag: `git tag -a vX.Y.Z -m "vX.Y.Z"`
4. Push new tag: `git push --tags`
5. Publish new version on npm: `npm publish --access public`

### Package linking

The best option for development of React UI is to link `react-ui` into your application with `npm link`.

1. In React UI repository run `npm link` 
2. In your application run `npm link @react-ui-org/react-ui`

To prevent [Invalid Hook Call Warning](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react)
when React UI is linked, add following code to Webpack configuration of your client:

```
const path = require('path');

resolve: {
  alias: {
    react: path.resolve('./node_modules/react'),
    'react-dom': path.resolve('./node_modules/react-dom'),
  },
}
```
