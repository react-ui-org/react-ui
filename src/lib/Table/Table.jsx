import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.renderHeaderCell = this.renderHeaderCell.bind(this);

    this.sortCellStyle = {
      backgroundColor: 'lightgray',
    };
  }

  renderHeaderCell(column) {
    const { sort } = this.props;
    const sortDirection = sort && column.name === sort.column ? sort.direction : 'asc';
    const sortCellStyle = sort && column.name === sort.column ? this.sortCellStyle : null;

    return (
      <th key={column.name} style={sortCellStyle}>
        {sort && column.isSortable && (
          <Button
            clickHandler={() => sort.changeHandler(column.name, sortDirection)}
            icon={sortDirection === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            isLabelVisible={false}
            label={sortDirection}
            priority={column.name === sort.column ? 'primary' : 'default'}
          />
        )}
        {column.label}
      </th>
    );
  }

  renderBodyCell(column, row) {
    const { sort } = this.props;
    const sortCellStyle = sort && column.name === sort.column ? this.sortCellStyle : null;

    if (column.format) {
      return (
        <td key={`${row.id}-${column.name}`} style={sortCellStyle}>
          {column.format(row)}
        </td>
      );
    }

    return (
      <td key={`${row.id}-${column.name}`} style={sortCellStyle}>
        {row[column.name]}
      </td>
    );
  }

  render() {
    const {
      columns,
      rows,
    } = this.props;

    return (
      <table>
        <thead>
          <tr>
            {columns.map(this.renderHeaderCell)}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              {columns.map(column => this.renderBodyCell(column, row))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.defaultProps = {
  sort: null,
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    format: PropTypes.func,
    isSortable: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
  })).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  })).isRequired,
  sort: PropTypes.shape({
    changeHandler: PropTypes.func.isRequired,
    column: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
  }),
};

export default Table;
