# React UI

To build the project:

1. Install local npm packages: `$ npm install`
2. Run the build: `$ npm build`

To run the dev server:

1. Install local npm packages: `$ npm install`
2. Run the build: `$ npm start`

## Translations

Structure of translations can be found in file `src/lib/Translation/TranslationContext.jsx`. You can use `TranslationProvider`
component and pass translated structure from this file into `TranslationProvider` as `translations` props to overwrite default
translations.

Second option is to overwrite translations locally using `translations` props of specific component.
