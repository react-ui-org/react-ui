# isChildrenEmpty

The `isChildrenEmpty` helper function determines whether the given children
value should be considered "empty".

It is useful in React when conditionally rendering components based on
whether children contain meaningful content.

## Usage

To use `isChildrenEmpty` helper, you need to import it first:

```js
import { isChildrenEmpty } from '@react-ui-org/react-ui';
```

Then use it:

```docoff-react-preview

React.createElement(() => {
  const children = null;
  const isEmpty = isChildrenEmpty(children);

  if (isEmpty === false) {
    return (
      <div>{children}</div>
    );
  }

  return (
    <div>Children not provided</div>
  );
});
```

```docoff-react-preview
React.createElement(() => {
  const children = (
    <>
      <h1>Title</h1>
      <p>Content</p>
    </>
  );
  const isEmpty = isChildrenEmpty(children);

  if (isEmpty === false) {
    return (
      <div>{children}</div>
    );
  }

  return (
    <div>Children not provided</div>
  );
});
```
