import type { CssModuleClasses } from '../../../types';
import type { TextWordWrapping } from '../Text.types';

export const getRootWordWrappingClassName = (styles: CssModuleClasses, wordWrapping?: TextWordWrapping) => {
  if (wordWrapping === 'anywhere') {
    return styles.isRootWordWrappingAnywhere;
  }

  if (wordWrapping === 'long-words') {
    return styles.isRootWordWrappingLongWords;
  }

  return null;
};
