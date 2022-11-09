# Spacing

Responsive spacing helper classes enable to simply add or modify `margin` and
`padding` properties where necessary.

## Naming System

The classes are named using the format `[property][sides]-[size]` for `xs` and
`[property][sides]-[breakpoint]-[size]` for `sm`, `md`, `lg`, `xl`, `x2l`, and
 `x3l` [breakpoints](/docs/foundation/breakpoints).

Where `property` is one of:

- `m` - for classes that set `margin`
- `p` - for classes that set `padding`

Where `sides` is one of:

- `t` - for classes that set `margin-top` or `padding-top`
- `b` - for classes that set `margin-bottom` or `padding-bottom`
- `l` - for classes that set `margin-left` or `padding-left`
- `r` - for classes that set `margin-right` or `padding-right`

Where `size` is one of:

- `0`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `auto` for classes that set the `margin` to `auto`

👉 Check the [spacing scale](/docs/foundation/spacing) to see the exact values of
individual sizes.

## Examples

Example of the `margin-bottom` property applied for all viewport sizes:

```docoff-react-preview
<div>
  <div className="mb-0">
    <docoff-placeholder bordered>
      <code>.mb-0</code>
    </docoff-placeholder>
  </div>
  <div className="mb-1">
    <docoff-placeholder bordered>
      <code>.mb-1</code>
    </docoff-placeholder>
  </div>
  <div className="mb-2">
    <docoff-placeholder bordered>
      <code>.mb-2</code>
    </docoff-placeholder>
  </div>
  <div className="mb-3">
    <docoff-placeholder bordered>
      <code>.mb-3</code>
    </docoff-placeholder>
  </div>
  <div className="mb-4">
    <docoff-placeholder bordered>
      <code>.mb-4</code>
    </docoff-placeholder>
  </div>
  <div className="mb-5">
    <docoff-placeholder bordered>
      <code>.mb-5</code>
    </docoff-placeholder>
  </div>
  <div className="mb-6">
    <docoff-placeholder bordered>
      <code>.mb-6</code>
    </docoff-placeholder>
  </div>
  <div className="mb-7">
    <docoff-placeholder bordered>
      <code>.mb-7</code>
    </docoff-placeholder>
  </div>
</div>
```

Example of the `padding-left` property applied from `sm` breakpoint up:

```docoff-react-preview
<div>
  <div className="pl-sm-0">
    <docoff-placeholder bordered>
      <code>.pl-sm-0</code>
    </docoff-placeholder>
  </div>
  <div className="pl-sm-1">
    <docoff-placeholder bordered>
      <code>.pl-sm-1</code>
    </docoff-placeholder>
  </div>
  <div className="pl-sm-2">
    <docoff-placeholder bordered>
      <code>.pl-sm-2</code>
    </docoff-placeholder>
  </div>
  <div className="pl-sm-3">
    <docoff-placeholder bordered>
      <code>.pl-sm-3</code>
    </docoff-placeholder>
  </div>
  <div className="pl-sm-4">
    <docoff-placeholder bordered>
      <code>.pl-sm-4</code>
    </docoff-placeholder>
  </div>
  <div className="pl-sm-5">
    <docoff-placeholder bordered>
      <code>.pl-sm-5</code>
    </docoff-placeholder>
  </div>
  <div className="pl-sm-6">
    <docoff-placeholder bordered>
      <code>.pl-sm-6</code>
    </docoff-placeholder>
  </div>
  <div className="pl-sm-7">
    <docoff-placeholder bordered>
      <code>.pl-sm-7</code>
    </docoff-placeholder>
  </div>
</div>
```
