import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../../utils/transferProps';
import { TableHeaderCell } from './_components/TableHeaderCell';
import { TableBodyCell } from './_components/TableBodyCell';
import styles from './Table.module.scss';

export const Table = ({
  columns,
  id,
  rows,
  sort,
  ...restProps
}) => (
  <table
    {...transferProps(restProps)}
    className={styles.table}
    id={id}
  >
    <thead>
      <tr className={styles.tableHeadRow}>
        {columns.map((column) => (
          <TableHeaderCell
            column={column}
            key={column.name}
            sort={sort}
            {...(id && { id: `${id}__headerCell__${column.name}` })}
          />
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr
          className={styles.tableRow}
          key={row.id}
        >
          {columns.map((column) => (
            <TableBodyCell
              format={column.format}
              isSortingActive={sort && column.name === sort.column}
              key={`${row.id}-${column.name}`}
              value={row[column.name]}
              {...(id && { id: `${id}__bodyCell__${column.name}__${row.id}` })}
            />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

Table.defaultProps = {
  id: undefined,
  sort: null,
};

Table.propTypes = {
  /**
   * Table data columns, optionally sortable. The `format` function can be used to process the
   * column data before displaying them.
   */
  columns: PropTypes.arrayOf(PropTypes.shape({
    format: PropTypes.func,
    isSortable: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
  })).isRequired,
  /**
   * ID of the root HTML element. It also serves as base for nested elements:
   * * `<ID>__headerCell__<COLUMN_NAME>`
   * * `<ID>__headerCell__<COLUMN_NAME>__sortButton`
   * * `<ID>__bodyCell__<COLUMN_NAME>__<ROW_ID>`
   */
  id: PropTypes.string,
  /**
   * Table data rows, each object key must match a column `name`
   */
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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

export const TableWithGlobalProps = withGlobalProps(Table, 'Table');

export default TableWithGlobalProps;
