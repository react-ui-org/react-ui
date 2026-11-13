import React from 'react';
import styles from './MultiSelectFieldDropdownGroup.module.scss';
import type { MultiSelectFieldDropdownGroupProps } from './MultiSelectFieldDropdownGroup.types';

/**
 * Group of options in the dropdown, labelled by its heading. The heading is presentational, so the listbox
 * contains only options and groups for screen readers.
 */
const MultiSelectFieldDropdownGroup: React.FunctionComponent<MultiSelectFieldDropdownGroupProps> = ({
  children,
  id,
  label,
}: MultiSelectFieldDropdownGroupProps) => (
  <div
    aria-labelledby={id}
    role="group"
  >
    <div
      className={styles.label}
      id={id}
      role="presentation"
    >
      {label}
    </div>
    {children}
  </div>
);

export default MultiSelectFieldDropdownGroup;
