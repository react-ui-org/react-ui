
interface ExtendedStyles extends React.CSSProperties {
  isRootStateInvalid: string;
  isRootStateValid: string;
  isRootStateWarning: string;
}

export const getRootValidationStateClassName = (validationState: Validation | undefined, styles: ExtendedStyles) => {
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
