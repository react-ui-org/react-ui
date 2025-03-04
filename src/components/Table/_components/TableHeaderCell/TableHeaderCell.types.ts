import { TableSortConfig } from '../../Table.types';

export type TableHeaderCellProps = {
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
   * ID of the HTML `<th>` element and nested button for sorting.
   */
  id?: string;
  /**
   * Sorting configuration required to make columns sortable.
   */
  sort?: TableSortConfig;
};
