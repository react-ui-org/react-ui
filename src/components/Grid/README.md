# Grid

The responsive Grid layout aligns content into an organized grid.

## Basic Usage

To implement the Grid component, you need to import it first:

```js
import { Grid } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<Grid>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
</Grid>
```

See [API](#api) for all available options.

## General Guidelines

- This component implements the native [CSS grid layout][grid-layout], a
  powerful tool for two-dimensional layouts. You may use any value accepted by
  [grid-template-columns], [grid-template-rows], [grid-auto-flow],
  [align-content], [align-items], [justify-content], [justify-items], and CSS
  properties in corresponding API options of the component.

- To align your items in the grid, **simply wrap** them with the Grid
  component. Unlike other grid frameworks and UI libraries, **no additional
  markup** like GridItem or Cell is necessary for your items. But it's there
  when you really need it—see [Advanced Layouts](#advanced-layouts).

- For forms, use rather the [FormLayout](/components/FormLayout) component
  which is designed specifically for that purpose.

- The Grid component is so powerful that it enables you to build even very
  advanced layouts **without** having to write **a single line of custom CSS.**
  See [Advanced Layouts](#advanced-layouts) for more.

👉 Vertical margin of items inside Grid is reset to zero.

## Columns

Stack is the default outcome of Grid. Use the `columns` option to organize your
items into a grid.

```docoff-react-preview
<Grid columns="1fr 1fr 1fr">
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
</Grid>
```

You can use the [`repeat()`][repeat] function to specify a recurring pattern.

```docoff-react-preview
<Grid columns="repeat(3, 1fr)">
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
</Grid>
```

Combine `repeat()` with `auto-fit` and [`minmax()`][minmax] to build automatic
responsive layouts.

```docoff-react-preview
<Grid columns="repeat(auto-fit, minmax(200px, auto))">
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
</Grid>
```

👉 If you need your items to have **equal height** even with the content of
varying lengths, it may be necessary to set `height: 100%` on them.

## Rows

Use `columns` and `rows` to specify a more complicated grid layout.

```docoff-react-preview
<Grid columns="1fr 2fr" rows="auto 200px auto">
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
</Grid>
```

## Gaps

Both column and row gaps can be customized. The value must correspond to any of
[available spacings](/docs/foundation/spacing).

```docoff-react-preview
<Grid columns="repeat(3, 1fr)" columnGap={2} rowGap={6}>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
</Grid>
```

## Alignment

Individual items and the entire grid content can be aligned along both axes.

```docoff-react-preview
<Grid
  columns="repeat(3, 10em)"
  alignItems="center"
  justifyItems="center"
  justifyContent="center"
>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item<br /> with two lines</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
</Grid>
```

## Custom HTML Tag

To render as a list, for example, just change the output `tag` to `ul` or `ol`
and wrap your items with `<li>`.

```docoff-react-preview
<Grid tag="ul">
  <li>
    <docoff-placeholder bordered>List item</docoff-placeholder>
  </li>
  <li>
    <docoff-placeholder bordered>List item</docoff-placeholder>
  </li>
  <li>
    <docoff-placeholder bordered>List item</docoff-placeholder>
  </li>
</Grid>
```

## Media Queries

If you need to build more complicated layouts, you have full control over the
grid definition. Just specify your grid layout for
[breakpoints](/docs/foundation/breakpoints) where a change of layout is needed.
The Grid component is written with the mobile-first approach so values for small
breakpoints are used until they're overridden by a bigger breakpoint.

👉 With this syntax there are no defaults for individual breakpoints.

📐 Try resizing your browser to see how it works.

```docoff-react-preview
<Grid
  columns={{
    xs: '1fr',
    md: '1fr 2fr',
  }}
  columnGap={{
    xs: 4,
    md: 2,
    lg: 4,
  }}
  rows={{
    xs: 'auto auto 200px 200px',
    md: 'auto 200px auto',
  }}
  rowGap={{
    xs: 3,
    md: 4,
  }}
>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
  <docoff-placeholder bordered>Grid item</docoff-placeholder>
</Grid>
```

## Advanced Layouts

Wrap your content with the GridSpan component to span it over multiple
columns or rows. Use the `autoFlow` option to control the layout when combined
with responsive columns and rows.

```docoff-react-preview
<Grid
  autoFlow={{
    xs: 'row dense',
    sm: 'column',
  }}
  columns={{
    xs: 'repeat(2, 1fr)',
    sm: 'repeat(4, 1fr)',
  }}
  rows={{
    xs: 'repeat(8, 50px)',
    sm: 'auto 100px auto auto',
  }}
>
  <docoff-placeholder bordered>Grid item 1</docoff-placeholder>
  <docoff-placeholder bordered>Grid item 2</docoff-placeholder>
  <docoff-placeholder bordered>Grid item 3</docoff-placeholder>
  <docoff-placeholder bordered>Grid item 4</docoff-placeholder>
  <docoff-placeholder bordered>Grid item 5</docoff-placeholder>
  <GridSpan columns={2} rows={2}>
    <docoff-placeholder bordered height="100%">
      Grid item spanning over two lines and two rows
    </docoff-placeholder>
  </GridSpan>
  <docoff-placeholder bordered>Grid item 6</docoff-placeholder>
  <docoff-placeholder bordered>Grid item 7</docoff-placeholder>
  <docoff-placeholder bordered>Grid item 8</docoff-placeholder>
  <docoff-placeholder bordered>Grid item 9</docoff-placeholder>
  <docoff-placeholder bordered>Grid item 10</docoff-placeholder>
  <docoff-placeholder bordered>Grid item 11</docoff-placeholder>
  <docoff-placeholder bordered>Grid item 12</docoff-placeholder>
</Grid>
```

👉 `autoFlow` (used in the example above) implements the `grid-auto-flow` CSS
property. Check [MDN][grid-auto-flow] to fully understand available options.

## Forwarding HTML Attributes

In addition to the options below in the [component's API](#api) section, you
can specify **any HTML attribute you like.** All attributes that don't interfere
with the API of the React component are forwarded to the root `<div>` HTML
element. This enables making the component interactive and helps to improve
its accessibility.

👉 For forwarding HTML attributes programmatically, you can use the `transferProps` function. For detailed usage examples, refer to the [TransferProps documentation](/src/docs/js-helpers/transferProps.md).

For the full list of supported attributes, you can also refer to:

- [`<div>` HTML element attributes][div-attributes]{:target="_blank"}
- [React common props]{:target="_blank"}


## API

<docoff-react-props src="/components/Grid/Grid.jsx"></docoff-react-props>

### GridSpan API

Wrapper for content that should span multiple rows or columns.

<docoff-react-props src="/components/Grid/GridSpan.jsx"></docoff-react-props>

[grid-layout]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
[grid-template-columns]: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
[grid-template-rows]: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows
[grid-auto-flow]: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow
[align-content]: https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
[align-items]: https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
[justify-content]: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
[justify-items]: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items
[repeat]: https://developer.mozilla.org/en-US/docs/Web/CSS/repeat
[minmax]: https://developer.mozilla.org/en-US/docs/Web/CSS/minmax
[React common props]: https://react.dev/reference/react-dom/components/common#common-props
[div-attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div#attributes
[all-html-elements]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element
