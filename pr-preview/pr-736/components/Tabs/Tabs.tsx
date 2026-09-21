import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import styles from './Tabs.module.scss';
import type { TabsProps } from './Tabs.types';

export const Tabs: React.FunctionComponent<TabsProps> = ({
  children,
  id,
  ...restProps
}: TabsProps) => (
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

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
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

export const TabsWithGlobalProps = withGlobalProps<TabsProps, HTMLElement>(Tabs, 'Tabs');

export default TabsWithGlobalProps;
