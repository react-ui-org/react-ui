import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import Button from '../Button';
import styles from './Table.scss';

export class Table extends React.Component {
  constructor(props) {
    super(props);

    this.renderHeaderCell = this.renderHeaderCell.bind(this);

    this.sortCellStyle = {
      backgroundColor: 'lightgray',
    };
  }

  renderHeaderCell(column) {
    const {
      id,
      sort,
    } = this.props;
    const sortDirection = sort && column.name === sort.column ? sort.direction : 'asc';
    const isSortingActive = sort && column.name === sort.column;

    return (
      <th
        className={isSortingActive ? styles.isTableHeadCellSortingActive : styles.tableHeadCell}
        key={column.name}
        {...(id && { id: `${id}__headerCell__${column.name}` })}
      >
        {sort && column.isSortable && (
          <div className={styles.sortButton}>
            <Button
              beforeLabel={
                sortDirection === 'asc'
                  ? sort.ascendingIcon
                  : sort.descendingIcon
              }
              label={sortDirection}
              labelVisibility="none"
              onClick={() => sort.onClick(column.name, sortDirection)}
              priority="flat"
              {...(id && { id: `${id}__headerCell__${column.name}__sortButton` })}
            />
          </div>
        )}
        {column.label}
      </th>
    );
  }

  renderBodyCell(column, row) {
    const {
      id,
      sort,
    } = this.props;
    const isSortingActive = sort && column.name === sort.column;

    if (column.format) {
      return (
        <td
          className={isSortingActive ? styles.isTableCellSortingActive : styles.tableCell}
          key={`${row.id}-${column.name}`}
          {...(id && { id: `${id}__bodyCell__${column.name}__${row.id}` })}
        >
          {column.format(row)}
        </td>
      );
    }

    return (
      <td
        className={isSortingActive ? styles.isTableCellSortingActive : styles.tableCell}
        key={`${row.id}-${column.name}`}
        {...(id && { id: `${id}__bodyCell__${column.name}__${row.id}` })}
      >
        {row[column.name]}
      </td>
    );
  }

  render() {
    const {
      columns,
      id,
      rows,
    } = this.props;

    return (
      <table id={id} className={styles.table}>
        <thead>
          <tr className={styles.tableHeadRow}>
            {columns.map(this.renderHeaderCell)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className={styles.tableRow}>
              {columns.map((column) => this.renderBodyCell(column, row))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

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
   * ID of the root HTML element. It also serves as base fo nested elements:
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

export const TableWithContext = withProviderContext(Table, 'Table');

export default TableWithContext;
