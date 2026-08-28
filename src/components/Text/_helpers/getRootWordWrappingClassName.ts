import type { CssModuleClasses } from '../../../types';
import type { TextWordWrapping } from '../Text.types';

export const getRootWordWrappingClassName = (
  wordWrapping: TextWordWrapping | undefined,
  styles: CssModuleClasses,
) => {
  if (wordWrapping === 'anywhere') {
    return styles.isRootWordWrappingAnywhere;
  }

  if (wordWrapping === 'long-words') {
    return styles.isRootWordWrappingLongWords;
  }

  return null;
};
