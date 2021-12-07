import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import { generateResponsiveCustomProperties } from './_helpers/generateResponsiveCustomProperties';
import styles from './Grid.scss';

export const Grid = ({
  alignContent,
  alignItems,
  autoFlow,
  children,
  columnGap,
  columns,
  id,
  justifyContent,
  justifyItems,
  rowGap,
  rows,
  tag: Tag,
  ...other
}) => {
  if (!children) {
    return null;
  }

  return (
    <Tag
      id={id}
      className={styles.root}
      style={{
        ...generateResponsiveCustomProperties(columns, 'columns'),
        ...generateResponsiveCustomProperties(columnGap, 'column-gap'),
        ...generateResponsiveCustomProperties(rows, 'rows'),
        ...generateResponsiveCustomProperties(rowGap, 'row-gap'),
        ...generateResponsiveCustomProperties(autoFlow, 'auto-flow'),
        ...generateResponsiveCustomProperties(alignContent, 'align-content'),
        ...generateResponsiveCustomProperties(alignItems, 'align-items'),
        ...generateResponsiveCustomProperties(justifyContent, 'justify-content'),
        ...generateResponsiveCustomProperties(justifyItems, 'justify-items'),
      }}
      {...other}
    >
      {children}
    </Tag>
  );
};

/* Breakpoints are easier to work with when ordered according to their value, not name. */
/* eslint-disable sort-keys */

Grid.defaultProps = {
  alignContent: undefined,
  alignItems: undefined,
  autoFlow: undefined,
  children: null,
  columnGap: undefined,
  columns: undefined,
  id: undefined,
  justifyContent: undefined,
  justifyItems: undefined,
  rowGap: undefined,
  rows: undefined,
  tag: 'div',
};

Grid.propTypes = {
  /**
   * Content alignment. Accepts any valid value of `align-content` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content) for more.
   */
  alignContent: PropTypes.oneOfType([
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
   * Items alignment. Accepts any valid value of `align-items` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) for more.
   */
  alignItems: PropTypes.oneOfType([
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
   * Grid auto-flow algorithm to be used. Accepts any valid value of `grid-auto-flow` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow) for more.
   */
  autoFlow: PropTypes.oneOfType([
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
   * Items to be aligned in the grid.
   */
  children: PropTypes.node,
  /**
   * Gap between columns. Accepts any valid value of `grid-column-gap` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap) for more.
   */
  columnGap: PropTypes.oneOfType([
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
  columns: PropTypes.oneOfType([
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
   * Content justification. Accepts any valid value of `justify-content` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) for more.
   */
  justifyContent: PropTypes.oneOfType([
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
   * Items justification. Accepts any valid value of `justify-items` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items) for more.
   */
  justifyItems: PropTypes.oneOfType([
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
   * Gap between rows. Accepts any valid value of `grid-row-gap` CSS property.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap) for more.
   */
  rowGap: PropTypes.oneOfType([
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
  rows: PropTypes.oneOfType([
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
   * HTML tag to render. Can be any valid HTML tag of your choice, usually a
   * [block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements).
   */
  tag: PropTypes.string,
};

export const GridWithContext = withProviderContext(Grid, 'Grid');

export default GridWithContext;
