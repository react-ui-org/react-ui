import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
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
}: TabsItemProps) => (
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

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
TabsItem.propTypes = {
  /**
   * Optional element shown after item's label, e.g. an icon.
   */
  afterLabel: PropTypes.node,
  /**
   * Optional element shown before item's label, e.g. an icon.
   */
  beforeLabel: PropTypes.node,
  /**
   * Item's link URL. Optionally add custom routing function to the `onClick` option to bypass
   * browser's default navigation.
   */
  href: PropTypes.string.isRequired,
  /**
   * ID of the root HTML element. It also serves as base for nested elements:
   * * `<ID>__link`
   * * `<ID>__label`
   */
  id: PropTypes.string,
  /**
   * If `true`, item is marked as active.
   */
  isActive: PropTypes.bool,
  /**
   * Item's label.
   */
  label: PropTypes.string.isRequired,
  /**
   * Function to call on item click, e.g. custom routing function.
   */
  onClick: PropTypes.func,
};

export const TabsItemWithGlobalProps = withGlobalProps<TabsItemProps, never>(TabsItem, 'TabsItem');

export default TabsItemWithGlobalProps;
