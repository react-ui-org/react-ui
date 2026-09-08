import type {
  CssModuleClasses,
  ValidationState,
} from '../../types';

export const getRootValidationStateClassName = (styles: CssModuleClasses, validationState?: ValidationState) => {
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
