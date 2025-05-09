import type { Priority } from '../../../types';

export default (priority: Priority, styles: Record<string, string>) => {
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
