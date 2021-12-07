export const getRootHyphensClassName = (hyphens, styles) => {
  if (hyphens === 'auto') {
    return styles.rootHyphensAuto;
  }

  if (hyphens === 'manual') {
    return styles.rootHyphensManual;
  }

  return null;
};
