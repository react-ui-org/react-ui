import React from 'react';
import styles from './MultiSelectFieldDropdownTextItem.module.scss';
import type { MultiSelectFieldDropdownTextItemProps } from './MultiSelectFieldDropdownTextItem.types';

const MultiSelectFieldDropdownTextItem: React.FunctionComponent<MultiSelectFieldDropdownTextItemProps> = ({
  children,
}: MultiSelectFieldDropdownTextItemProps) => (
  <div className={styles.root}>
    {children}
  </div>
);

export default MultiSelectFieldDropdownTextItem;
