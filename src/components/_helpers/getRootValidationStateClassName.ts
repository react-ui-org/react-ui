import { Validation } from '../../types';

export const getRootValidationStateClassName = (
  validationState: Validation | undefined,
  styles: Record<string, string>,
) => {
  if (validationState === 'invalid') {
    return styles.isRootStateInvalid;
  }

  if (validationState === 'valid') {
    return styles.isRootStateValid;
  }

  if (validationState === 'warning') {
    return styles.isRootStateWarning;
  }

  return null;
};
