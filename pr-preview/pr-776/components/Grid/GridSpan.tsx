import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import { generateResponsiveCustomProperties } from './_helpers/generateResponsiveCustomProperties';
import styles from './Grid.module.scss';
import type { GridSpanProps } from './Grid.types';

export const GridSpan: React.FunctionComponent<GridSpanProps> = ({
  children,
  columns = 1,
  rows = 1,
  tag: Tag = 'div',
  ...restProps
}: GridSpanProps) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <Tag
      {...transferProps(restProps)}
      className={styles.span}
      style={{
        ...generateResponsiveCustomProperties(columns, 'column-span'),
        ...generateResponsiveCustomProperties(rows, 'row-span'),
      }}
    >
      {children}
    </Tag>
  );
};

/* Breakpoints are easier to work with when ordered according to their value, not name. */
/* eslint-disable sort-keys */

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
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

export const GridSpanWithGlobalProps = withGlobalProps<GridSpanProps, HTMLElement>(GridSpan, 'GridSpan');

export default GridSpanWithGlobalProps;
