interface ExtendedStyles extends React.CSSProperties {
  isRootJustifiedToCenter: string;
  isRootJustifiedToEnd: string;
  isRootJustifiedToSpaceBetween: string;
  isRootJustifiedToStart: string;
  isRootJustifiedToStretch: string;
}

export const getJustifyClassName = (value: Justify, styles: ExtendedStyles) => {
  if (value === 'start') {
    return styles.isRootJustifiedToStart;
  }

  if (value === 'center') {
    return styles.isRootJustifiedToCenter;
  }

  if (value === 'end') {
    return styles.isRootJustifiedToEnd;
  }

  if (value === 'space-between') {
    return styles.isRootJustifiedToSpaceBetween;
  }

  return styles.isRootJustifiedToStretch;
};
