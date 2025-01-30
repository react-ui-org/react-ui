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
<div
  className={classNames(
    'd-inline-block',
    Date.now() > 1609455600 && 'text-warning',
    Date.now() > 1622498400 ? 'text-secondary' : null,
  )}
>
  {(new Date()).toLocaleDateString()}
</div>
```
