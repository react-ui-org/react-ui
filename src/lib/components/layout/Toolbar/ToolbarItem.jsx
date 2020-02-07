import PropTypes from 'prop-types';
import React from 'react';
import styles from './Toolbar.scss';

const ToolbarItem = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.item}>
      {children}
    </div>
  );
};

ToolbarItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ToolbarItem;
