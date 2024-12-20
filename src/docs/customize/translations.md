# Translations

Some components may contain texts which improve components' accessibility.
All texts are in English by default and can be translated to other languages.

Structure of translations can be found in the file [src/translations/en.json].

To use custom translations, you need to import `TranslationsProvider` first:

```js
import { TranslationsProvider } from '@react-ui-org/react-ui';
```

Then wrap application (or its part) with `TranslationsProvider` with
the `translations` prop object.

```docoff-react-preview
<TranslationsProvider translations={{
  Alert: { close: 'Close now!' }
}}>
  <Alert onClose={() => alert('You closed me!')}>
    Hi, I'm a closable Alert.
  </Alert>
</TranslationsProvider>
```

## Nesting

The `TranslationsProvider`s can be nested. This is useful e.g. when you want to
configure translations across whole application and then override some of them
in a specific part of the application.

When a nested `TranslationsProvider` is used, the props are merged deeply together.
This means that you can extend specific object with new props or override existing
ones.

```docoff-react-preview
<TranslationsProvider translations={{
  Alert: { close: 'Close now!' }
}}>
  <Alert onClose={() => alert('You closed me!')}>
    Hi, I'm a closable Alert.
  </Alert>

  <TranslationsProvider translations={{
    Alert: { close: 'Close immediately!' }
  }}>
    <Alert onClose={() => alert('You closed me!')}>
      Hi, I'm another Alert and I'm also closable.
    </Alert>
  </TranslationsProvider>
</TranslationsProvider>
```

[src/translations/en.json]: https://github.com/react-ui-org/react-ui/blob/master/src/translations/en.js
