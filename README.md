# React UI

## Usage in Projects

React UI consists of three main building blocks:

1. **Core styles:** basic themeable CSS layer, preparing ground for components.
2. **Components:** reusable and themeable React components.
3. **Theme (optional):** adjust appearance of your UI via CSS custom properties.

To use React UI in your project:

1. `$ npm install --save react-ui`
2. Import core styles to the topmost level of your React app, for example:
    ```js
    // React UI core CSS
    import 'react-ui/src/lib/core/core.scss';
    ```
    ⚠️ As of now, you will need SASS pipeline for this to work. This is to be fixed in the future.
3. Use React UI components just like you are used to:
    ```js
    import { Icon } from 'react-ui';
    ```
4. Optionally, use CSS custom properties to theme your UI.
   Remember to import your theme **after the core styles** so it overwrites the default one.
   See [`src/lib/core/themes/_default.scss`](./src/lib/core/themes/_default.scss) for the full list of available options.  

## Translations

Structure of translations can be found in file `src/lib/Translation/TranslationContext.jsx`. You can use `TranslationProvider`
component and pass translated structure from this file into `TranslationProvider` as `translations` props to overwrite default
translations.

Second option is to overwrite translations locally using `translations` props of specific component.

## Contributing

To build the project:

1. Install local npm packages: `$ npm install`
2. Run the build: `$ npm build`

To run the dev server:

1. Install local npm packages: `$ npm install`
2. Run the build: `$ npm start`
