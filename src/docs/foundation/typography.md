# Typography

Typography is the basic means to present information to users. It also serves to
communicate the hierarchy of a page.

👉 All values on this page can be changed by
[overriding](/docs/customize/theming/overview) values in your
[design tokens](/docs/foundation/design-tokens).

## Showcase

Font sizes:

```docoff-react-preview
<p className="font-size-1">Font size 1 (base font size)</p>
<p className="font-size-2">Font size 2</p>
<p className="font-size-3">Font size 3</p>
<p className="font-size-4">Font size 4</p>
<p className="font-size-5">Font size 5</p>
<p className="font-size-6">Font size 6</p>
```

Styling of basic HTML elements:

```docoff-react-preview
<p>
  Curabitur sagittis hendrerit ante. Integer pellentesque quam vel velit. Sed
  vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem.
  Pellentesque sapien. Ut enim ad minima veniam, quis nostrum exercitationem
  ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
  consequatur?
</p>
<p>
  <strong>Bold text</strong>
</p>
<p>
  <em>Emphasized text</em>
</p>
<p>
  <small>Small text</small>
</p>
<p>
  <code>Inline code</code>
</p>
<p>
  <a href="/">Link</a>
</p>
<ul>
  <li>Unordered list item 1</li>
  <li>Unordered list item 2</li>
  <li>Unordered list item 3</li>
</ul>
<ol>
  <li>Ordered list item 1</li>
  <li>Ordered list item 2</li>
  <li>Ordered list item 3</li>
</ol>
```

## Font

React UI uses [native font stack][sm-native-font-stack] for optimum text
rendering on every device and OS.

👉 You can replace the native font stack with a
[custom font](/docs/customize/font).

## Customization

Font size, font weight, and line height values can be
[customised](/docs/customize/theming/overview) as well:

```css
:root {
  /* Font sizes */
  --rui-font-size-base: 100%;
  --rui-font-size-small: 0.889rem;
  --rui-font-size-smaller: 0.75rem;
  --rui-font-size-code: 85%;

  --rui-font-size-1: 1rem;
  --rui-font-size-2: 1.125rem;
  --rui-font-size-3: 1.266rem;
  --rui-font-size-4: 1.424rem;
  --rui-font-size-5: 1.602rem;
  --rui-font-size-6: 1.802rem;

  /* Line heights */
  --rui-line-height-base: 1.5;
  --rui-line-height-small: 1.25;

  /* Font weights */
  --rui-font-weight-base: 400;
  --rui-font-weight-light: 300;
  --rui-font-weight-bold: 700;
}
```

[sm-native-font-stack]: https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/
