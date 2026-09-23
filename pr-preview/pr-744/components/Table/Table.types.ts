import type {
  ReactNode,
  TableHTMLAttributes,
} from 'react';

export type TableColumn = {
  format?: (value: unknown) => ReactNode;
  isSortable?: boolean;
  label?: string;
  name: string;
};

export type TableRow = Record<string, unknown> & {
  id: string | number;
};

export type TableSortDirection = 'asc' | 'desc';

export type TableSort = {
  ascendingIcon: ReactNode;
  column: string;
  descendingIcon: ReactNode;
  direction: TableSortDirection;
  onClick: (column: string, direction: TableSortDirection) => void;
};

/**
 * Props of the `Table` component.
 */
export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
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
  rows: TableRow[];
  /**
   * Sorting configuration required to make columns sortable.
   */
  sort?: TableSort;
};
