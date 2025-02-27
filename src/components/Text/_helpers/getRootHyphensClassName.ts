import { Hyphens } from '../../../types';

export const getRootHyphensClassName = (hyphens: Hyphens, styles: Record<string, string>) => {
  if (hyphens === 'auto') {
    return styles.isRootHyphensAuto;
  }

  if (hyphens === 'manual') {
    return styles.isRootHyphensManual;
  }

  return null;
};
