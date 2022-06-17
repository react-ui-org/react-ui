import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { generateResponsiveCustomProperties } from './_helpers/generateResponsiveCustomProperties';
import styles from './Grid.scss';

export const GridSpan = ({
  children,
  columns,
  id,
  rows,
  tag: Tag,
  ...other
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <Tag
      id={id}
      className={styles.span}
      style={{
        ...generateResponsiveCustomProperties(columns, 'column-span'),
        ...generateResponsiveCustomProperties(rows, 'row-span'),
      }}
      {...other}
    >
      {children}
    </Tag>
  );
};

/* Breakpoints are easier to work with when ordered according to their value, not name. */
/* eslint-disable sort-keys */

GridSpan.defaultProps = {
  children: null,
  columns: undefined,
  id: undefined,
  rows: undefined,
  tag: 'div',
};

GridSpan.propTypes = {
  /**
   * Items to be aligned in the grid. If none are provided nothing is rendered.
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
      x2l: PropTypes.number,
      x3l: PropTypes.number,
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
      x2l: PropTypes.number,
      x3l: PropTypes.number,
    }),
  ]),
  /**
   * HTML tag to render. Can be any valid HTML tag of your choice, usually a
   * [block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements).
   */
  tag: PropTypes.string,
};

export const GridSpanWithGlobalProps = withGlobalProps(GridSpan, 'GridSpan');

export default GridSpanWithGlobalProps;
