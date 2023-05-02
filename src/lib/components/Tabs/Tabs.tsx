import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import styles from './Tabs.scss';
import { TabsProps } from './Tabs.types';

export const Tabs : React.FunctionComponent<TabsProps> = ({
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
