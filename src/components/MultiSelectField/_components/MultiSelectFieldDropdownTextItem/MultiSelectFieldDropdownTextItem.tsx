import PropTypes from 'prop-types';
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

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
MultiSelectFieldDropdownTextItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MultiSelectFieldDropdownTextItem;
