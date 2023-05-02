interface ExtendedStyles extends React.CSSProperties {
  isRootAtCenter: string;
  isRootAtEnd: string;
  isRootAtStart: string;
}

export default (placement: Placement, styles: ExtendedStyles) => {
  const alignment = placement.split('-')[1];

  if (alignment === 'start') {
    return styles.isRootAtStart;
  }

  if (alignment === 'end') {
    return styles.isRootAtEnd;
  }

  return styles.isRootAtCenter;
};
