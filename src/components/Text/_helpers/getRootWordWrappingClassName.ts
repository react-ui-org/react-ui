import type { WordWrapping } from '../../../types';

export const getRootWordWrappingClassName = (wordWrapping: WordWrapping, styles: Record<string, string>) => {
  if (wordWrapping === 'anywhere') {
    return styles.isRootWordWrappingAnywhere;
  }

  if (wordWrapping === 'long-words') {
    return styles.isRootWordWrappingLongWords;
  }

  return null;
};
