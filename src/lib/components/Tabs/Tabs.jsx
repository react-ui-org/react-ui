import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import styles from './Tabs.scss';

export const Tabs = ({
  children,
  id,
}) => (
  <nav id={id}>
    <ul
      className={styles.list}
      id={id && `${id}__list`}
    >
      {children}
    </ul>
  </nav>
);

Tabs.defaultProps = {
  children: null,
  id: undefined,
};

Tabs.propTypes = {
  /**
   * Nested `TabsItem` elements.
   */
  children: PropTypes.node,
  /**
   * ID of the root HTML element. It also serves as base for nested element:
   * * `<ID>__list`
   */
  id: PropTypes.string,
};

export const TabsWithContext = withProviderContext(Tabs, 'Tabs');

export default TabsWithContext;
