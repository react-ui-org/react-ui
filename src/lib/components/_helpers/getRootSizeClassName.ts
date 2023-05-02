interface ExtendedStyles extends React.CSSProperties {
  isRootSizeLarge: string;
  isRootSizeMedium: string;
  isRootSizeSmall: string;
}

export const getRootSizeClassName = (size: Size | undefined, styles: ExtendedStyles) => {
  if (size === 'small') {
    return styles.isRootSizeSmall;
  }

  if (size === 'medium') {
    return styles.isRootSizeMedium;
  }

  if (size === 'large') {
    return styles.isRootSizeLarge;
  }

  return null;
};
