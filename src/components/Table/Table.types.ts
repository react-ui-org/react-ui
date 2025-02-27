import { ReactNode } from 'react';
import { Direction } from '../../types';

type TableColumn = {
  /**
   * Function to format column data before displaying.
   */
  format?: (value: unknown) => unknown;
  /**
   * If `true`, the column is sortable.
   */
  isSortable?: boolean;
  /**
   * Label for the column header.
   */
  label?: string;
  /**
   * Unique name for the column.
   */
  name: string;
};

export type TableSortConfig = {
  /**
   * Icon displayed when sorting in ascending order.
   */
  ascendingIcon: ReactNode;
  /**
   * The column currently sorted.
   */
  column: string;
  /**
   * Icon displayed when sorting in descending order.
   */
  descendingIcon: ReactNode;
  /**
   * Sorting direction.
   */
  direction: Direction;
  /**
   * Callback function triggered when sorting is changed.
   */
  onClick: (column: string, direction: Direction) => void;
};

export type TableProps = React.ComponentProps<'table'> & {
  /**
   * Table data columns, optionally sortable. The `format` function can be used to process the
   * column data before displaying them.
   */
  columns: TableColumn[];
  /**
   * ID of the root HTML element. It also serves as base for nested elements:
   * * `<ID>__headerCell__<COLUMN_NAME>`
   * * `<ID>__headerCell__<COLUMN_NAME>__sortButton`
   * * `<ID>__bodyCell__<COLUMN_NAME>__<ROW_ID>`
   */
  id?: string;
  /**
   * Table data rows, each object key must match a column `name`
   */
  rows: (Record<string, string> & { id: string })[];
  /**
   * Sorting configuration required to make columns sortable.
   */
  sort?: TableSortConfig;
};
