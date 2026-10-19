import { statePropTest as generalStatePropTest } from '../../../../../tests/playwright/propTests/statePropTest';
import type { PropTests } from '../../../../../tests/playwright/types';

export const statePropTest: PropTests = generalStatePropTest
  .map(({
    name,
    props,
  }) => ({
    name,
    props: {
      inputProps: {
        state: props.state as string,
      },
      validationTexts: ['Validation text.'],
    },
  }));
