# Display

Responsive display helper classes enable to change the `display` CSS property,
including hiding the content.

## Naming System

The classes are named using the format `d-[value]` for `xs` and
`d-[breakpoint]-[value]` for `sm`, `md`, `lg`, `xl`, `x2l`, and `x3l`
[breakpoints](/docs/foundation/breakpoints).

Where `value` is one of:

- `block`
- `flex`
- `inline`
- `inline-block`
- `inline-flex`
- `none`

## Examples

```docoff-react-preview
<div className="d-inline-block">
  <code>.d-inline-block</code>
</div>
<div className="d-inline-block">
  <code>.d-inline-block</code>
</div>
```

```docoff-react-preview
<div className="d-block">
  <code>.d-block</code>
</div>
<div className="d-block">
  <code>.d-block</code>
</div>
```

## Hiding Content

To hide elements simply use the `.d-none` class or one of the
`.d-{sm,md,lg,xl,x2l,x3l}-none` classes for any responsive screen variation.

To show an element only on a given interval of screen sizes you can combine one
`.d-*-none` class with a `.d-*-*` class, for example `.d-none` `.d-md-block`
will hide the element for all screen sizes except on the `md` size.

```docoff-react-preview
<p className="d-none d-md-block">
  This element is hidden on small screens and it becomes visible on screens
  starting from the <code>md</code> breakpoint.
</p>
```

👉 It's perfectly OK to hide the content with the `.d-none` helper class. Just
note that it can be even easier with the less known
[`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden)
HTML attribute. [Browser support](https://caniuse.com/hidden) is awesome, so why
not to use it!

```docoff-react-preview
Invisible elements
<span role="img" aria-label="Cannot see monkey">🙈</span>.
Nothing here!
<div className="d-none">You cannot see me!</div>
<div hidden>I am invisible, too</div>
```
