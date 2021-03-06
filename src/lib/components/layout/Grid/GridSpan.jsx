import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../../provider';
import { generateResponsiveCustomProperties } from './helpers/generateResponsiveCustomProperties';
import styles from './Grid.scss';

export const GridSpan = ({
  children,
  columns,
  id,
  rows,
  ...other
}) => {
  if (!children) {
    return null;
  }

  return (
    <div
      id={id}
      className={styles.span}
      style={{
        ...generateResponsiveCustomProperties(columns, 'column-span'),
        ...generateResponsiveCustomProperties(rows, 'row-span'),
      }}
      {...other}
    >
      {children}
    </div>
  );
};

/* Breakpoints are easier to work with when ordered according to their value, not name. */
/* eslint-disable sort-keys */

GridSpan.defaultProps = {
  children: null,
  columns: undefined,
  id: undefined,
  rows: undefined,
};

GridSpan.propTypes = {
  /**
   * Items to be aligned in the grid.
   */
  children: PropTypes.node,
  /**
   * Number of columns to span.
   */
  columns: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      xs: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
      xl: PropTypes.number,
      xxl: PropTypes.number,
      xxxl: PropTypes.number,
    }),
  ]),
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Number of rows to span.
   */
  rows: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      xs: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
      xl: PropTypes.number,
      xxl: PropTypes.number,
      xxxl: PropTypes.number,
    }),
  ]),
};

export const GridSpanWithContext = withProviderContext(GridSpan, 'GridSpan');

export default GridSpanWithContext;
