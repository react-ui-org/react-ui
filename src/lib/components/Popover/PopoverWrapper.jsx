import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import styles from './PopoverWrapper.scss';

export const PopoverWrapper = ({
  children,
  id,
  tag: Tag,
  ...restProps
}) => (
  <Tag
    {...transferProps(restProps)}
    className={styles.root}
    id={id}
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

export const PopoverWrapperWithContext = withGlobalProps(PopoverWrapper, 'PopoverWrapper');

export default PopoverWrapperWithContext;

