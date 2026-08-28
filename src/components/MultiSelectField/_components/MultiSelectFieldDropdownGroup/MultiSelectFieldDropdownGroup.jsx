import PropTypes from 'prop-types';
import React from 'react';
import styles from './MultiSelectFieldDropdownGroup.module.scss';

const MultiSelectFieldDropdownGroup = ({
  children,
  label,
}) => (
  <div
    aria-label={label}
    role="group"
  >
    <div className={styles.label}>
      {label}
    </div>
    {children}
  </div>
);

MultiSelectFieldDropdownGroup.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default MultiSelectFieldDropdownGroup;
