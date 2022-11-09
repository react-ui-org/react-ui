export default (placement, styles) => {
  const alignment = placement.split('-')[1];

  if (alignment === 'start') {
    return styles.isRootAtStart;
  }

  if (alignment === 'end') {
    return styles.isRootAtEnd;
  }

  return styles.isRootAtCenter;
};
