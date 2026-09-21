import type { CssModuleClasses } from '../../../types';

export const getRootClampClassName = (styles: CssModuleClasses, lines?: number) => {
  if (lines === 1) {
    return styles.isRootClampSingleLine;
  }

  if (lines !== undefined && lines > 1) {
    return styles.isRootClampMultiLine;
  }

  return null;
};
