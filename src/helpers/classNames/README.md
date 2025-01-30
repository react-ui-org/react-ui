# classNames

The `classNames` helper function simplifies creating a string passable to
the `class` / `className` attribute.

It accepts multiple arguments, filters out invalid values, and returns a single
string where the remaining parameters are joined by a space.

## Usage

To use `classNames` helper, you need to import it first:

```js
import { classNames } from '@react-ui-org/react-ui';
```

And use it:

```docoff-react-preview
<>
  <div
  className={classNames(
    'd-block',
    new Date('2025-01-01T00:00:00') < new Date() && 'text-danger',
  )}
  >
  {(new Date()).toLocaleDateString()}
  </div>
  <div
  className={classNames(
    'd-block',
    new Date('3000-01-01T00:00:00') < new Date() && 'text-danger',
  )}
  >
  {(new Date()).toLocaleDateString()}
  </div>
</>
```

## Parameter Filtering

The `classNames` function:

* filters out all values that are not strings
* filters out empty strings
* filters out whitespace only strings

<!-- markdownlint-disable MD010 -->
```docoff-react-preview
{classNames(
  'class-1',
  'class-2 class-3',
  ' ',
  ' ', // non-breakable space
  '	', // tab
  '',
  0,
  1,
  null,
  undefined,
  true,
  false,
)}
```
<!-- markdownlint-enable MD010 -->
