import type { CssModuleClasses } from '../../../types';
import type { TextHyphens } from '../Text.types';

export const getRootHyphensClassName = (styles: CssModuleClasses, hyphens?: TextHyphens) => {
  if (hyphens === 'auto') {
    return styles.isRootHyphensAuto;
  }

  if (hyphens === 'manual') {
    return styles.isRootHyphensManual;
  }

  return null;
};
