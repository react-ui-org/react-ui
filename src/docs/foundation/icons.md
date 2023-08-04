# Icons

React UI **does not include any icons** to allow more flexibility and to reduce
its size. Components that require icons allow them to be passed in via props.

Example:

```jsx
import { Alert } from '@react-ui-org/react-ui';
import { Icon } from './my-icon-component';

<Alert
  icon={<Icon icon="ok-sign" />}
  color="success"
>
  This is a success!
</Alert>
```
