import { validationStatePropTest as generaValidationPropTest } from '../../../../../tests/playwright/propTests/validationStatePropTest';
import type { PropTests } from '../../../../../tests/playwright/types';

export const validationStatePropTest: PropTests = generaValidationPropTest
  .map(({
    name,
    props,
  }) => ({
    name,
    props: {
      inputProps: {
        validationState: props.validationState as string,
      },
      validationTexts: ['Validation text.'],
    },
  }));
