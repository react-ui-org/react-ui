import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import withForwardedRef from '../withForwardedRef';
import styles from './Popover.scss';

export const PopoverWrapper = ({
  children,
  id,
  tag: Tag,
  ...restProps
}) => (
  <Tag
    className={styles.wrapper}
    id={id}
    {...restProps}
  >
    {children}
  </Tag>
);

PopoverWrapper.defaultProps = {
  id: undefined,
  tag: 'div',
};

PopoverWrapper.propTypes = {
  /**
   * Popover reference and the Popover itself.
   */
  children: PropTypes.node.isRequired,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * HTML tag to render. Can be any valid HTML tag of your choice, usually a
   * [block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements).
   */
  tag: PropTypes.string,
};

export const PopoverWrapperWithContext = withForwardedRef(withGlobalProps(PopoverWrapper, 'PopoverWrapper'));

export default PopoverWrapperWithContext;

