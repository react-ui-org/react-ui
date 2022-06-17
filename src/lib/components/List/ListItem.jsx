import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './List.scss';

export const ListItem = ({
  children,
  id,
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <li className={styles.item} id={id}>
      {children}
    </li>
  );
};

ListItem.defaultProps = {
  children: null,
  id: undefined,
};

ListItem.propTypes = {
  /**
   * Content of the list item. If none are provided nothing is rendered.
   */
  children: PropTypes.node,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
};

export const ListItemWithGlobalProps = withGlobalProps(ListItem, 'ListItem');

export default ListItemWithGlobalProps;
