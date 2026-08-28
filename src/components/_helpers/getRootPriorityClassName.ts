import type {
  CssModuleClasses,
  Priority,
} from '../../types';

export const getRootPriorityClassName = (priority: Priority | undefined, styles: CssModuleClasses) => {
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
