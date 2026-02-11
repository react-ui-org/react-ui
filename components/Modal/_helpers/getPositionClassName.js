export const getPositionClassName = (modalPosition, styles) => {
  if (modalPosition === 'top') {
    return styles.isRootPositionTop;
  }

  return null;
};
