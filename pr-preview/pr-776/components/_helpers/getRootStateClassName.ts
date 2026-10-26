import type {
  CssModuleClasses,
  State,
} from '../../types';

export const getRootStateClassName = (styles: CssModuleClasses, state?: State) => {
  if (state === 'changed') {
    return styles.isRootStateChanged;
  }

  if (state === 'invalid') {
    return styles.isRootStateInvalid;
  }

  if (state === 'valid') {
    return styles.isRootStateValid;
  }

  if (state === 'warning') {
    return styles.isRootStateWarning;
  }

  return undefined;
};
