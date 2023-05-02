import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import styles from './TabsItem.scss';
import { TabsItemProps } from './Tabs.types';

export const TabsItem: React.FunctionComponent<TabsItemProps> = ({
  afterLabel,
  beforeLabel,
  href,
  id,
  isActive = false,
  label,
  onClick,
  ...restProps
}) => (
  <li
    {...transferProps(restProps)}
    className={classNames(
      styles.root,
      isActive && styles.isRootActive,
    )}
    id={id}
    key={href}
  >
    <a
      className={styles.link}
      href={href}
      id={id && `${id}__link`}
      onClick={onClick}
    >
      <span className={styles.linkContent}>
        {beforeLabel}
        <span
          className={styles.label}
          id={id && `${id}__label`}
        >
          {label}
        </span>
        {afterLabel}
      </span>
    </a>
  </li>
);

export const TabsItemWithGlobalProps = withGlobalProps(TabsItem, 'TabsItem');

export default TabsItemWithGlobalProps;
