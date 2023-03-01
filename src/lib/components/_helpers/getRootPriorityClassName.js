export default (priority, styles) => {
  if (priority === 'filled') {
    return styles.isRootPriorityFilled;
  }

  if (priority === 'outline') {
    return styles.isRootPriorityOutline;
  }

  if (priority === 'flat') {
    return styles.isRootPriorityFlat;
  }

  return null;
};
