import PropTypes from 'prop-types';
import React from 'react';
import styles from './List.scss';

const ListItem = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <li className={styles.item}>
      {children}
    </li>
  );
};

ListItem.defaultProps = {
  children: null,
};

ListItem.propTypes = {
  children: PropTypes.node,
};

export default ListItem;
