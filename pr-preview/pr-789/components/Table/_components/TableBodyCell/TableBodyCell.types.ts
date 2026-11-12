import type { TableColumn } from '../../Table.types';

export type TableBodyCellProps = {
  /**
   * Function that can be used to process the column data before displaying them.
   */
  format?: TableColumn['format'];
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
};
