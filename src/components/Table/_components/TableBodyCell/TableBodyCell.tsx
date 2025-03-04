import React, { ReactNode } from 'react';
import styles from '../TableCell.module.scss';
import { TableBodyCellProps } from './TableBodyCell.types';

export const TableBodyCell: React.FunctionComponent<TableBodyCellProps> = ({
  format,
  id,
  isSortingActive = false,
  value,
}) => (
  <td
    className={isSortingActive ? styles.isTableCellSortingActive : styles.tableCell}
    id={id}
  >
    {(format ? format(value) : value) as ReactNode}
  </td>
);

export default TableBodyCell;
