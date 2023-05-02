type Sort = {
  ascendingIcon: React.ReactNode;
  column: React.ReactNode;
  descendingIcon: React.ReactNode;
  direction: Direction;
  onClick: (name: string, direction: Direction) => unknown;
};

export interface TableProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Table data columns, optionally sortable. The `format` function can be used to process the
   * column data before displaying them.
   */
  columns: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    format?: Function
    isSortable?: boolean;
    label?: string;
    name: string;
  }[];
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
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  rows: Record<string, any>[];
  /**
   * Sorting configuration required to make columns sortable.
   */
  sort?: Sort;
}

export interface TableHeaderCellProps {
  /**
   * Table data column, optionally sortable. The `format` function can be used to process the
   * column data before displaying them.
   */
  column: {
    isSortable?: boolean;
    label?: string;
    name: string;
  };
  /**
   * ID of the HTML <th> element and nested button for sorting.
   */
  id?: string;
  /**
   * Sorting configuration required to make columns sortable.
   */
  sort?: Sort;
}

export interface TableBodyCellProps {
  /**
   * Function that can be used to process the column data before displaying them.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  format?: Function
  /**
   * ID of the HTML <td> element:
   */
  id?: string;
  /**
   * If `true`, cell is gray marked as sorted.
   */
  isSortingActive?: boolean;
  /**
   * Cell value.
   */
  value?: unknown;
}
