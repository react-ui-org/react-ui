export const getRootHyphensClassName = (hyphens, styles) => {
  if (hyphens === 'auto') {
    return styles.isRootHyphensAuto;
  }

  if (hyphens === 'manual') {
    return styles.isRootHyphensManual;
  }

  return null;
};
