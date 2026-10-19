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

export default MultiSelectFieldDropdownGroup;
