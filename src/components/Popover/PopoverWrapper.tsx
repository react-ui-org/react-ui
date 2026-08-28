import PropTypes from 'prop-types';
import React from 'react';
import type { ElementType } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import styles from './PopoverWrapper.module.scss';
import type { PopoverWrapperProps } from './Popover.types';

export const PopoverWrapper: React.FunctionComponent<PopoverWrapperProps> = ({
  children,
  tag = 'div',
  ...restProps
}: PopoverWrapperProps) => {
  const Tag = tag as ElementType;

  return (
    <Tag
      {...transferProps(restProps)}
      className={styles.root}
    >
      {children}
    </Tag>
  );
};

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
PopoverWrapper.propTypes = {
  /**
   * Popover reference and the Popover itself.
   */
  children: PropTypes.node.isRequired,
  /**
   * HTML tag to render. Can be any valid HTML tag of your choice, usually a
   * [block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements).
   */
  tag: PropTypes.string,
};

export const PopoverWrapperWithContext = withGlobalProps<PopoverWrapperProps, HTMLElement>(PopoverWrapper, 'PopoverWrapper');

export default PopoverWrapperWithContext;
