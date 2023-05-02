import React from 'react';
import styles from '../TableCell.scss';
import { TableBodyCellProps } from '../../Table.types';

export const TableBodyCell = ({
  format,
  id,
  isSortingActive = false,
  value,
}: TableBodyCellProps) => (
  <td
    className={isSortingActive ? styles.isTableCellSortingActive : styles.tableCell}
    id={id}
  >
    {format ? format(value) : value}
  </td>
);

export default TableBodyCell;
