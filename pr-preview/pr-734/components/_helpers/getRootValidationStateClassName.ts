import type {
  CssModuleClasses,
  ValidationState,
} from '../../types';

export const getRootValidationStateClassName = (
  validationState: ValidationState | undefined,
  styles: CssModuleClasses,
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
