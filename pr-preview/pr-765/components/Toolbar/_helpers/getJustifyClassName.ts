import type { CssModuleClasses } from '../../../types';
import type { ToolbarJustify } from '../Toolbar.types';

export const getJustifyClassName = (styles: CssModuleClasses, value?: ToolbarJustify) => {
  if (value === 'start') {
    return styles.isToolbarJustifiedToStart;
  }

  if (value === 'center') {
    return styles.isToolbarJustifiedToCenter;
  }

  if (value === 'end') {
    return styles.isToolbarJustifiedToEnd;
  }

  return styles.isToolbarJustifiedToSpaceBetween;
};

