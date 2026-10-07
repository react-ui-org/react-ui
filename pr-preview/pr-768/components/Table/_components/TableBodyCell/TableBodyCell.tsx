import PropTypes from 'prop-types';
import React from 'react';
import type { ReactNode } from 'react';
import styles from '../TableCell.module.scss';
import type { TableBodyCellProps } from './TableBodyCell.types';

export const TableBodyCell: React.FunctionComponent<TableBodyCellProps> = ({
  format,
  id,
  isSortingActive = false,
  value,
}: TableBodyCellProps) => (
  <td
    className={isSortingActive ? styles.isTableCellSortingActive : styles.tableCell}
    id={id}
  >
    {format ? format(value) : value as ReactNode}
  </td>
);

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
TableBodyCell.propTypes = {
  /**
   * Function that can be used to process the column data before displaying them.
   */
  format: PropTypes.func,
  /**
   * ID of the HTML <td> element:
   */
  id: PropTypes.string,
  /**
   * If `true`, cell is gray marked as sorted.
   */
  isSortingActive: PropTypes.bool,
  /**
   * Cell value.
   */
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
};

export default TableBodyCell;
