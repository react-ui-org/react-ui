# Font

React UI uses [native font stack][sm-native-font-stack] for optimum text
rendering on every device and OS.

This is a good practice because it reduces the size of the data transferred, and
it also ensures that the text is displayed in the font that the user is most
comfortable with.

You can change it to a custom font by loading the font in your project:

```html
   <link
     href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;700&display=swap"
     rel="stylesheet"
   />
```

… and [overriding](/docs/customize/theming/overview) the
`--rui-font-family-base` CSS custom property:

```css
:root {
  --rui-font-family-base: 'Titillium Web', helvetica, roboto, arial, sans-serif;
}
```

[sm-native-font-stack]: https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/
