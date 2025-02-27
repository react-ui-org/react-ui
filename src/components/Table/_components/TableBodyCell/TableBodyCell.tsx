import PropTypes from 'prop-types';
import React from 'react';
import styles from '../TableCell.module.scss';

export const TableBodyCell = ({
  format,
  id,
  isSortingActive,
  value,
}) => (
  <td
    className={isSortingActive ? styles.isTableCellSortingActive : styles.tableCell}
    id={id}
  >
    {format ? format(value) : value}
  </td>
);

TableBodyCell.defaultProps = {
  format: undefined,
  id: undefined,
  isSortingActive: false,
  value: null,
};

TableBodyCell.propTypes = {
  /**
   * Function that can be used to process the column data before displaying them.
   */
  format: PropTypes.func,
  /**
   * ID of the HTML <td> element:
   */
  id: PropTypes.string,
  /**
   * If `true`, cell is gray marked as sorted.
   */
  isSortingActive: PropTypes.bool,
  /**
   * Cell value.
   */
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
};

export default TableBodyCell;
