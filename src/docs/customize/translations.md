# Translations

Some components may contain texts which improve components' accessibility.
All texts are in English by default and can be translated to other languages.

Structure of translations can be found in the file `src/translations/en.json`.

To use custom translations, you need to import `RUIProvider` first:

```js
import { RUIProvider } from '@react-ui-org/react-ui';
```

Then wrap application (or its part) with `RUIProvider` with `translations` prop object.

```jsx
<RUIProvider translations={{
  Alert: {
    close: 'Close',
  },
  ModalCloseButton: {
    close: 'Close',
  },
  ScrollView: {
    next: 'Next',
    previous: 'Previous',
  },
}}>
  <Modal>
    // ...
  </Modal>
</RUIProvider>
```
