import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { TableHeaderCell } from './_components/TableHeaderCell';
import { TableBodyCell } from './_components/TableBodyCell';
import styles from './Table.scss';
import { TableProps } from './Table.types';

export const Table: React.FunctionComponent<TableProps> = ({
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
        <tr className={styles.tableRow} key={row.id}>
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

export const TableWithGlobalProps = withGlobalProps(Table, 'Table');

export default TableWithGlobalProps;
