export const getAlignClassName = (value, styles, type) => {
  if (value === 'top') {
    if (type === 'group') return styles.isGroupAlignedToTop;
    return styles.isToolbarAlignedToTop;
  }

  if (value === 'middle') {
    if (type === 'group') return styles.isGroupAlignedToMiddle;
    return styles.isToolbarAlignedToMiddle;
  }

  if (value === 'bottom') {
    if (type === 'group') return styles.isGroupAlignedToBottom;
    return styles.isToolbarAlignedToBottom;
  }

  if (type === 'group') return styles.isGroupAlignedToBaseline;
  return styles.isToolbarAlignedToBaseline;
};
