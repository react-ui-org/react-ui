import PropTypes from 'prop-types';
import React from 'react';
import styles from './MultiSelectFieldDropdownGroup.module.scss';
import type { MultiSelectFieldDropdownGroupProps } from './MultiSelectFieldDropdownGroup.types';

const MultiSelectFieldDropdownGroup: React.FunctionComponent<MultiSelectFieldDropdownGroupProps> = ({
  children,
  label,
}: MultiSelectFieldDropdownGroupProps) => (
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

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
MultiSelectFieldDropdownGroup.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default MultiSelectFieldDropdownGroup;
