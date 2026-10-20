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

export const TabsWithGlobalProps = withGlobalProps<TabsProps, HTMLElement>(Tabs, 'Tabs');

export default TabsWithGlobalProps;
