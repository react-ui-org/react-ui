import PropTypes from 'prop-types';
import React from 'react';
import { Button } from '../../../..';
import styles from '../TableCell.scss';

export const TableHeaderCell = ({
  column,
  id,
  sort,
}) => {
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

TableHeaderCell.defaultProps = {
  id: undefined,
  sort: null,
};

TableHeaderCell.propTypes = {
  /**
   * Table data column, optionally sortable. The `format` function can be used to process the
   * column data before displaying them.
   */
  column: PropTypes.shape({
    isSortable: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * ID of the HTML <th> element and nested button for sorting.
   */
  id: PropTypes.string,
  /**
   * Sorting configuration required to make columns sortable.
   */
  sort: PropTypes.shape({
    ascendingIcon: PropTypes.node.isRequired,
    column: PropTypes.string.isRequired,
    descendingIcon: PropTypes.node.isRequired,
    direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
    onClick: PropTypes.func.isRequired,
  }),
};

export default TableHeaderCell;
