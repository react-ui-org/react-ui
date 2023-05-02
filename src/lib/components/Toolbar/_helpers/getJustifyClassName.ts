interface ExtendedStyles extends React.CSSProperties {
  isToolbarJustifiedToCenter: string;
  isToolbarJustifiedToEnd: string;
  isToolbarJustifiedToSpaceBetween: string;
  isToolbarJustifiedToStart: string;
}

export const getJustifyClassName = (value: Justify, styles: ExtendedStyles) => {
  if (value === 'start') {
    return styles.isToolbarJustifiedToStart;
  }

  if (value === 'center') {
    return styles.isToolbarJustifiedToCenter;
  }

  if (value === 'end') {
    return styles.isToolbarJustifiedToEnd;
  }

  return styles.isToolbarJustifiedToSpaceBetween;
};

