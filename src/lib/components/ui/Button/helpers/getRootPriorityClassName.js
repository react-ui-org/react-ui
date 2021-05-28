export default (priority, styles) => {
  if (priority === 'filled') {
    return styles.rootPriorityFilled;
  }

  if (priority === 'outline') {
    return styles.rootPriorityOutline;
  }

  if (priority === 'flat') {
    return styles.rootPriorityFlat;
  }

  if (priority === 'link') {
    return styles.rootPriorityLink;
  }

  return null;
};
