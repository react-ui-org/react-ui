# Classnames

The `classNames` helper joins all classnames you pass into the function as
single classname. It automatically filters out empty strings and values that
are not strings, so you can conditionally assemble classnames and `classNames`
function will take care about the single format of classname for you.

## Basic Usage

To use `classNames` helper, you need to import it first:

```js
import { classNames } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<docoff-placeholder bordered>Grid item</docoff-placeholder>
<div
  className={classNames(
    'd-inline-block',
    true && 'mt-5',
    1 && 'ml-5',
    '',
    false && 'mb-5',
    null && 'mb-5',
    undefined && 'mb-5',
    0 && 'mb-5',
  )}
>
  {(new Date()).toLocaleDateString()}
</div>
<docoff-placeholder bordered>Grid item</docoff-placeholder>
```
