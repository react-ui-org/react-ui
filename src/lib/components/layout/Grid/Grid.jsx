import PropTypes from 'prop-types';
import React from 'react';
import { generateResponsiveCustomProperties } from './helpers/generateResponsiveCustomProperties';
import styles from './Grid.scss';

export const Grid = ({
  autoFlow,
  children,
  columnGap,
  columns,
  id,
  rowGap,
  rows,
  ...other
}) => {
  if (!children) {
    return null;
  }

  return (
    <div
      id={id}
      className={styles.root}
      style={{
        '--rui-local-auto-flow': autoFlow,
        ...generateResponsiveCustomProperties(columns, 'columns'),
        ...generateResponsiveCustomProperties(columnGap, 'column-gap'),
        ...generateResponsiveCustomProperties(rows, 'rows'),
        ...generateResponsiveCustomProperties(rowGap, 'row-gap'),
      }}
      {...other}
    >
      {children}
    </div>
  );
};

/* Breakpoints are easier to work with when ordered according to their value, not name. */
/* eslint-disable sort-keys */

Grid.defaultProps = {
  children: null,
  columnGap: undefined,
  columns: undefined,
  autoFlow: undefined,
  id: undefined,
  rowGap: undefined,
  rows: undefined,
};

Grid.propTypes = {
  /**
   * Grid auto-flow algorithm to be used. Accepts any valid value of `grid-auto-flow` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow) for more.
   */
  autoFlow: PropTypes.oneOf(['row', 'column', 'dense', 'row dense', 'column dense']),
  /**
   * Items to be aligned in the grid.
   */
  children: PropTypes.node,
  /**
   * Gap between columns. Accepts any valid value of `grid-column-gap` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap) for more.
   */
  columnGap: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.shape({
      xs: PropTypes.string,
      sm: PropTypes.string,
      md: PropTypes.string,
      lg: PropTypes.string,
      xl: PropTypes.string,
      xxl: PropTypes.string,
      xxxl: PropTypes.string,
    }),
  ]),
  /**
   * Grid columns. Accepts any valid value of `grid-template-columns` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) for more.
   */
  columns: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.shape({
      xs: PropTypes.string,
      sm: PropTypes.string,
      md: PropTypes.string,
      lg: PropTypes.string,
      xl: PropTypes.string,
      xxl: PropTypes.string,
      xxxl: PropTypes.string,
    }),
  ]),
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Gap between rows. Accepts any valid value of `grid-row-gap` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap) for more.
   */
  rowGap: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.shape({
      xs: PropTypes.string,
      sm: PropTypes.string,
      md: PropTypes.string,
      lg: PropTypes.string,
      xl: PropTypes.string,
      xxl: PropTypes.string,
      xxxl: PropTypes.string,
    }),
  ]),
  /**
   * Grid rows. Accepts any valid value of `grid-template-rows` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows) for more.
   */
  rows: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.shape({
      xs: PropTypes.string,
      sm: PropTypes.string,
      md: PropTypes.string,
      lg: PropTypes.string,
      xl: PropTypes.string,
      xxl: PropTypes.string,
      xxxl: PropTypes.string,
    }),
  ]),
};

export default Grid;
