export const getRootValidationStateClassName = (validationState, styles) => {
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
