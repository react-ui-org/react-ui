import React from 'react';
import styles from './MultiSelectFieldDropdownTextItem.module.scss';
import type { MultiSelectFieldDropdownTextItemProps } from './MultiSelectFieldDropdownTextItem.types';

/** Text shown in the dropdown instead of options, e.g. when no option matches the search. */
const MultiSelectFieldDropdownTextItem: React.FunctionComponent<MultiSelectFieldDropdownTextItemProps> = ({
  children,
}: MultiSelectFieldDropdownTextItemProps) => (
  <div className={styles.root}>
    {children}
  </div>
);

export default MultiSelectFieldDropdownTextItem;
