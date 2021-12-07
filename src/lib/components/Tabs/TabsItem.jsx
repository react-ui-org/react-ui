import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import { classNames } from '../../utils/classNames';
import styles from './TabsItem.scss';

export const TabsItem = ({
  afterLabel,
  beforeLabel,
  href,
  id,
  isActive,
  label,
  onClick,
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
      href={href}
      onClick={onClick}
      className={styles.link}
      id={id && `${id}__link`}
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

TabsItem.defaultProps = {
  afterLabel: null,
  beforeLabel: null,
  id: undefined,
  isActive: false,
  onClick: null,
};

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

export const TabsItemWithContext = withProviderContext(TabsItem, 'TabsItem');

export default TabsItemWithContext;
