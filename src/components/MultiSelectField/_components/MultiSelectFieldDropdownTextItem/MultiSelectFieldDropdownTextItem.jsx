import PropTypes from 'prop-types';
import React from 'react';
import styles from './MultiSelectFieldDropdownTextItem.module.scss';

const MultiSelectFieldDropdownTextItem = ({
  children,
}) => (
  <div className={styles.root}>
    {children}
  </div>
);

MultiSelectFieldDropdownTextItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MultiSelectFieldDropdownTextItem;
