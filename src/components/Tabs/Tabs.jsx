import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import styles from './Tabs.module.scss';

export const Tabs = ({
  children,
  id,
  ...restProps
}) => (
  <nav
    {...transferProps(restProps)}
    id={id}
  >
    <ul
      className={styles.list}
      id={id && `${id}__list`}
    >
      {children}
    </ul>
  </nav>
);

Tabs.defaultProps = {
  id: undefined,
};

Tabs.propTypes = {
  /**
   * Nested `TabsItem` elements.
   */
  children: PropTypes.node.isRequired,
  /**
   * ID of the root HTML element. It also serves as base for nested element:
   * * `<ID>__list`
   */
  id: PropTypes.string,
};

export const TabsWithGlobalProps = withGlobalProps(Tabs, 'Tabs');

export default TabsWithGlobalProps;
