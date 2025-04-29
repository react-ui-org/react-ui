import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames';
import { transferProps } from '../../helpers/transferProps';
import styles from './TabsItem.module.scss';
import type { TabsItemProps } from './TabsItem.types';

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
    className={classNames(
      styles.root,
      isActive && styles.isRootActive,
    )}
    id={id}
    key={href}
  >
    <a
      {...transferProps(restProps)}
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
