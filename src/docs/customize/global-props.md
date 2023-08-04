# Global Props

Sometimes it can be useful to share some configuration props between
multiple instances of components of the same or different kind.

This can be achieved by wrapping application or its part with `RUIProvider`
and passing in the common props through `globalProps` prop. With or without
using `RUIProvider` the component can be configured by passing in the props
directly. The props passed in directly always take precedence over props
coming from `RUIProvider`.

## Basic Usage

To define global props, you need to import `RUIProvider` first:

```js
import { RUIProvider } from '@react-ui-org/react-ui';
```

Then wrap application or its part with `RUIProvider` with defined `globalProps`
attribute holding an object. Keys are names of the components, and their
values are objects with arbitrary props you want to pass to the specified
components.

Keys conform to actual names of components:

```jsx
<RUIProvider globalProps={{
  Button: { priority: 'filled' },
  TextField: { variant: 'filled' },
  SelectField: { variant: 'filled' },
}}>
  //...
</RUIProvider>
```

See working example:

```docoff-react-preview
React.createElement(() => {
  const [variant, setVariant] = React.useState('filled');
  return (
    <RUIProvider
      globalProps={{
        Button: { priority: variant },
        TextField: { variant },
        SelectField: { variant },
      }}
    >
      <Toolbar align="bottom">
        <ToolbarItem>
          <SelectField
            id="variant"
            label="Select variant of Select Field"
            onChange={(e) => setVariant(e.target.value)}
            options={[
              {
                label: 'filled',
                value: 'filled',
              },
              {
                label: 'outline',
                value: 'outline',
              },
            ]}
            value={variant}
          />
        </ToolbarItem>
        <ToolbarItem>
          <TextField
            id="my-text-field"
            label="Text Field"
          />
        </ToolbarItem>
        <ToolbarItem>
          <Button
            id="my-button"
            label="Button"
          />
        </ToolbarItem>
      </Toolbar>
    </RUIProvider>
  );
});
```
