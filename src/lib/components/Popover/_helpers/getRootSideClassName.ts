interface ExtendedStyles extends React.CSSProperties {
  isRootAtBottom: string;
  isRootAtLeft: string;
  isRootAtRight: string;
  isRootAtTop: string;
}

export default (placement: Placement, styles: ExtendedStyles) => {
  const side = placement.split('-')[0];

  if (side === 'top') {
    return styles.isRootAtTop;
  }

  if (side === 'right') {
    return styles.isRootAtRight;
  }

  if (side === 'bottom') {
    return styles.isRootAtBottom;
  }

  return styles.isRootAtLeft;
};
