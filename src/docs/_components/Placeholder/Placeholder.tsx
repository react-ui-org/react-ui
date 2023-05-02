import React from 'react';
import { classNames } from '../../../lib/utils/classNames';
import styles from './Placeholder.scss';
import {
  PlaceholderProps, CustomCSSProperties,
} from './Placeholder.types';

export const Placeholder = ({
  bordered = false,
  children,
  dark = false,
  height,
  inline = false,
  width,
}: PlaceholderProps) => {
  const style: CustomCSSProperties = {
    '--rui-local-height': height,
    '--rui-local-width': width,
  };
  return (
    <div
      className={classNames(
        styles.root,
        bordered && styles.rootBordered,
        dark && styles.rootDark,
        inline && styles.rootInline,
      )}
      style={style}
    >
      {children}
    </div>
  );
};
export default Placeholder;
