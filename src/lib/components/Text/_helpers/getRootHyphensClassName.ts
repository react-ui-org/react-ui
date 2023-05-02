interface ExtendedStyles extends React.CSSProperties {
  isRootHyphensAuto: string;
  isRootHyphensManual: string;
}

export const getRootHyphensClassName = (hyphens: Hyphens, styles: ExtendedStyles) => {
  if (hyphens === 'auto') {
    return styles.isRootHyphensAuto;
  }

  if (hyphens === 'manual') {
    return styles.isRootHyphensManual;
  }

  return null;
};
