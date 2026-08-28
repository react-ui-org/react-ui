import type { CssModuleClasses } from '../../../types';

export const getRootClampClassName = (lines: number | undefined, styles: CssModuleClasses) => {
  if (lines === 1) {
    return styles.isRootClampSingleLine;
  }

  if (lines !== undefined && lines > 1) {
    return styles.isRootClampMultiLine;
  }

  return null;
};
