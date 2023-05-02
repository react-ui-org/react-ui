interface ExtendedStyles extends React.CSSProperties {
  isRootClampMultiLine: string;
  isRootClampSingleLine: string;
}

export const getRootClampClassName = (lines: number, styles: ExtendedStyles) => {
  if (lines === 1) {
    return styles.isRootClampSingleLine;
  }

  if (lines > 1) {
    return styles.isRootClampMultiLine;
  }

  return null;
};
