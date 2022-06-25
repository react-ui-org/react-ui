import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import {
  Toolbar,
  ToolbarItem,
} from '../Toolbar';
import styles from './ModalFooter.scss';

export const ModalFooter = ({
  children,
  id,
  justify,
}) => (
  <div
    className={styles.root}
    id={id}
  >
    <Toolbar
      dense
      justify={justify}
    >
      {React.Children.map(children, (child) => (
        <ToolbarItem>
          {child}
        </ToolbarItem>
      ))}
    </Toolbar>
  </div>
);

ModalFooter.defaultProps = {
  id: undefined,
  justify: 'center',
};

ModalFooter.propTypes = {
  /**
   * Nested `Button` elements.
   */
  children: PropTypes.node.isRequired,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Horizontal alignment (distribution) of individual buttons.
   */
  justify: PropTypes.oneOf(['start', 'center', 'end', 'space-between']),
};

export const ModalFooterWithGlobalProps = withGlobalProps(ModalFooter, 'ModalFooter');

export default ModalFooterWithGlobalProps;
