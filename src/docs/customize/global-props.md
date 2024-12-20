# Global Props

Sometimes it can be useful to share some configuration props between
multiple instances of components of the same or different kind.

This can be achieved by wrapping application or its part with `GlobalPropsProvider`
and passing in the common props through `globalProps` prop. With or without
using `GlobalPropsProvider` the component can be configured by passing in the props
directly. The props passed in directly always take precedence over props
coming from `GlobalPropsProvider`.

## Basic Usage

To define global props, you need to import `GlobalPropsProvider` first:

```js
import { GlobalPropsProvider } from '@react-ui-org/react-ui';
```

Then wrap application or its part with `GlobalPropsProvider` with defined `globalProps`
attribute holding an object. Keys are names of the components, and their
values are objects with arbitrary props you want to pass to the specified
components.

Keys conform to actual names of components.

```docoff-react-preview
<>
  <Badge label="1" />

  <GlobalPropsProvider
    globalProps={{
      Badge: { priority: 'outline' },
    }}
  >
    <Badge label="2" />
    <Badge
      label="3"
      priority="filled"
    />
  </GlobalPropsProvider>
</>
```

## Nesting

`GlobalPropsProvider`s can be nested. This is useful e.g. when you want to configure
props across whole application and then override some of them in a specific
part of the application.

When a nested `GlobalPropsProvider` is used, the props are merged deeply together.
This means that you only need to set the value that changes and the rest is inherited.
If you need to remove some prop, you can set it to `undefined`.

```docoff-react-preview
<GlobalPropsProvider globalProps={{
  Grid: {
    columns: {
      xs: '1fr',
      md: '1fr 1fr',
    },
    justifyItems: 'center',
    rows: {
      xs: '50px',
      md: '100px',
    },
  },
}}>
  <GlobalPropsProvider globalProps={{
    Grid: {
      columns: {
        sm: '1fr 1fr 1fr',
      },
      justifyItems: 'undefined',
      rows: undefined,
    },
  }}>
    <Grid>
      <docoff-placeholder bordered>Grid item</docoff-placeholder>
      <docoff-placeholder bordered>Grid item</docoff-placeholder>
      <docoff-placeholder bordered>Grid item</docoff-placeholder>
      <docoff-placeholder bordered>Grid item</docoff-placeholder>
      <docoff-placeholder bordered>Grid item</docoff-placeholder>
      <docoff-placeholder bordered>Grid item</docoff-placeholder>
    </Grid>
  </GlobalPropsProvider>
</GlobalPropsProvider>
```
