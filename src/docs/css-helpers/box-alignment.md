# Box Alignment

Responsive box-alignment helper classes allow aligning the content across both
axes by setting the `align-items` and `justify-content` CSS properties.

Use the box-alignment classes **on flex or grid containers,** they will not work
elsewhere.

👉 If you need to quickly create a flex container, there is the
[`.d-flex`](/docs/css-helpers/display) helper class at your disposal.

📖 Read more about [flexbox] and [grid] layout concepts.

## Naming System

The classes are named using the format `[alignment]-[value]` for `xs` and
`[alignment]-[breakpoint]-[value]` for `sm`, `md`, `lg`, `xl`, `x2l`, and
`x3l` [breakpoints](/docs/foundation/breakpoints).

Where `alignment` is one of:

- `align-items`
- `align-self`
- `justify-content`
- `justify-self`

For `align-items` and `align-self` the value can be:

- `center`
- `start`
- `flex-start`
- `end`
- `flex-end`
- `baseline`
- `stretch`

For `justify-content` the value can be:

- `center`
- `start`
- `flex-start`
- `end`
- `flex-end`
- `space-between`

For `justify-self` the value can be:

- `center`
- `start`
- `end`
- `baseline`
- `stretch`

👉 The difference between `start`/`flex-start` and `end`/`flex-end` is that the
prefixed variants are intended for flexbox while the versions without prefix
only work inside grid layout.

📖 [Read more about CSS Box Alignment concepts.][box-alignment]

## Horizontal (Main-Axis) Alignment (Justification)

There are 6 options of alignment on the main axis: `start` (`flex-start` for
flexbox), `center`, `end` (`flex-end` for flexbox), and `space-between`.

```docoff-react-preview
<div className="d-flex justify-content-flex-start">
  <docoff-placeholder bordered>
    <code>.justify-content-flex-start</code>
  </docoff-placeholder>
</div>
<div className="d-flex justify-content-center">
  <docoff-placeholder bordered>
    <code>.justify-content-center</code>
  </docoff-placeholder>
</div>
<div className="d-flex justify-content-flex-end">
  <docoff-placeholder bordered>
    <code>.justify-content-flex-end</code>
  </docoff-placeholder>
</div>
<div className="d-flex justify-content-space-between">
  <docoff-placeholder bordered>
    <code>.justify-content-space-between</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code>.justify-content-space-between</code>
  </docoff-placeholder>
</div>
```

## Vertical (Cross-Axis) Alignment

There are 7 options of alignment on the cross axis: `start` (`flex-start` for
flexbox), `center`, `end` (`flex-end` for flexbox), `baseline`, and `stretch`.

```docoff-react-preview
<docoff-placeholder bordered>
  <div className="d-flex align-items-flex-start" style={{ height: '6rem' }}>
    <docoff-placeholder bordered>
      <code>.align-items-flex-start</code>
    </docoff-placeholder>
  </div>
</docoff-placeholder>
<docoff-placeholder bordered>
  <div className="d-flex align-items-center" style={{ height: '6rem' }}>
    <docoff-placeholder bordered>
      <code>.align-items-center</code>
    </docoff-placeholder>
  </div>
</docoff-placeholder>
<docoff-placeholder bordered>
  <div className="d-flex align-items-flex-end" style={{ height: '6rem' }}>
    <docoff-placeholder bordered>
      <code>.align-items-flex-end</code>
    </docoff-placeholder>
  </div>
</docoff-placeholder>
<docoff-placeholder bordered>
  <div className="d-flex align-items-baseline" style={{ height: '6rem' }}>
    <docoff-placeholder bordered>
      <code>.align-items-baseline</code>
    </docoff-placeholder>
    <docoff-placeholder bordered>
      <code style={{ lineHeight: 4 }}>.align-items-baseline</code>
    </docoff-placeholder>
  </div>
</docoff-placeholder>
<docoff-placeholder bordered>
  <div className="d-flex align-items-stretch" style={{ height: '6rem' }}>
    <docoff-placeholder bordered>
      <code>.align-items-stretch</code>
    </docoff-placeholder>
  </div>
</docoff-placeholder>
```

## Responsive Box Alignment

From `sm` up you can set the desired box alignment for individual
[breakpoints](/docs/foundation/breakpoints).

```docoff-react-preview
<div className="d-flex justify-content-sm-flex-start">
  <docoff-placeholder bordered>
    <code>.justify-content-sm-flex-start</code>
  </docoff-placeholder>
</div>
<div className="d-flex justify-content-md-center">
  <docoff-placeholder bordered>
    <code>.justify-content-md-center</code>
  </docoff-placeholder>
</div>
<div className="d-flex justify-content-lg-flex-end">
  <docoff-placeholder bordered>
    <code>.justify-content-lg-flex-end</code>
  </docoff-placeholder>
</div>
<div className="d-flex justify-content-xl-space-between">
  <docoff-placeholder bordered>
    <code>.justify-content-xl-space-between</code>
  </docoff-placeholder>
  <docoff-placeholder bordered>
    <code>.justify-content-xl-space-between</code>
  </docoff-placeholder>
</div>
```

[flexbox]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox
[grid]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids
[box-alignment]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Alignment
