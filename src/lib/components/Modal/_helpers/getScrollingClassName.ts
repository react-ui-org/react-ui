interface ExtendedStyles extends React.CSSProperties {
  isRootScrollingAuto: string;
  isRootScrollingCustom: string;
}

export const getScrollingClassName = (type: Scrolling, styles: ExtendedStyles) => {
  if (type === 'auto') {
    return styles.isRootScrollingAuto;
  }

  if (type === 'custom') {
    return styles.isRootScrollingCustom;
  }

  return null;
};
