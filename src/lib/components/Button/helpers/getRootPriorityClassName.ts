interface ExtendedStyles extends React.CSSProperties {
  isRootPriorityFilled: string;
  isRootPriorityFlat: string;
  isRootPriorityOutline: string;
}

export default (priority: Priority, styles: ExtendedStyles) => {
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
