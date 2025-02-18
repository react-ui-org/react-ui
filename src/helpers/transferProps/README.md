# transferProps

The `transferProps` helper controls passing of props from the React component
to the HTML element.

It enables making the component interactive and helps to improve its
accessibility. However some props should never be passed to the HTML element
as it would break things. This function is used to filter them out. Among these
props are:

- `children`
- `className`
- `contentEditable`
- `dangerouslySetInnerHtml`
- `ref`
- `staticContext`
- `style`
- `suppressContentEditableWarning`

👉 When run in development mode, the function will log the error to the console
if any invalid props are passed.

## Basic Usage

To use `transferProps` helper, you need to import it first:

```js
import { transferProps } from "@react-ui-org/react-ui";
```

And use it:

```jsx
const CustomComponent = ({
  children,
  id,
  ...restProps
}) => (
  <div
    {...transferProps(restProps)}
    id={id && `${id}__customComponent`}
  >
    {children}
  </div>
);
```
