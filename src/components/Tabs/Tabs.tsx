import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import type { TabsProps } from './Tabs.types';
import styles from './Tabs.module.scss';

export const Tabs: React.FunctionComponent<TabsProps> = ({
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

export const TabsWithGlobalProps = withGlobalProps(Tabs, 'Tabs');

export default TabsWithGlobalProps;
