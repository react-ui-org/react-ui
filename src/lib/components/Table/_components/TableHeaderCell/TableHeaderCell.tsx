import React from 'react';
import { Button } from '../../../Button/Button';
import styles from '../TableCell.scss';
import { TableHeaderCellProps } from '../../Table.types';

export const TableHeaderCell = ({
  column,
  id,
  sort,
}: TableHeaderCellProps) => {
  const sortDirection = sort && column.name === sort.column ? sort.direction : 'asc';
  const isSortingActive = sort && column.name === sort.column;

  return (
    <th
      className={isSortingActive ? styles.isTableHeadCellSortingActive : styles.tableHeadCell}
      id={id}
    >
      <span className={styles.tableHeadCellLayout}>
        {sort && column.isSortable && (
          <Button
            aria-pressed={isSortingActive}
            beforeLabel={
              sortDirection === 'asc'
                ? sort.ascendingIcon
                : sort.descendingIcon
            }
            color={isSortingActive ? 'selected' : 'secondary'}
            id={id && `${id}__sortButton`}
            label={sortDirection}
            labelVisibility="none"
            onClick={() => sort.onClick(column.name, sortDirection)}
            priority="flat"
            size="small"
          />
        )}
        {column.label}
      </span>
    </th>
  );
};

export default TableHeaderCell;
