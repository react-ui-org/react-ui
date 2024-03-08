import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import styles from './PopoverWrapper.module.scss';

export const PopoverWrapper = ({
  children,
  tag: Tag,
  ...restProps
}) => (
  <Tag
    {...transferProps(restProps)}
    className={styles.root}
  >
    {children}
  </Tag>
);

PopoverWrapper.defaultProps = {
  tag: 'div',
};

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

export const PopoverWrapperWithContext = withGlobalProps(PopoverWrapper, 'PopoverWrapper');

export default PopoverWrapperWithContext;
