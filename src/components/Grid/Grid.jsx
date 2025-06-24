import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import { generateResponsiveCustomProperties } from './_helpers/generateResponsiveCustomProperties';
import styles from './Grid.module.scss';

const SPACING_VALUES = [0, 1, 2, 3, 4, 5, 6, 7];

export const Grid = ({
  alignContent,
  alignItems,
  autoFlow,
  children,
  columnGap,
  columns,
  justifyContent,
  justifyItems,
  rowGap,
  rows,
  tag: Tag,
  ...restProps
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <Tag
      {...transferProps(restProps)}
      className={styles.root}
      style={{
        ...generateResponsiveCustomProperties(columns, 'columns'),
        ...generateResponsiveCustomProperties(columnGap, 'column-gap', 'spacing'),
        ...generateResponsiveCustomProperties(rows, 'rows'),
        ...generateResponsiveCustomProperties(rowGap, 'row-gap', 'spacing'),
        ...generateResponsiveCustomProperties(autoFlow, 'auto-flow'),
        ...generateResponsiveCustomProperties(alignContent, 'align-content'),
        ...generateResponsiveCustomProperties(alignItems, 'align-items'),
        ...generateResponsiveCustomProperties(justifyContent, 'justify-content'),
        ...generateResponsiveCustomProperties(justifyItems, 'justify-items'),
      }}
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
  columnGap: 4,
  columns: '1fr',
  justifyContent: undefined,
  justifyItems: undefined,
  rowGap: 4,
  rows: 'auto',
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
      x2l: PropTypes.string,
      x3l: PropTypes.string,
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
      x2l: PropTypes.string,
      x3l: PropTypes.string,
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
      x2l: PropTypes.string,
      x3l: PropTypes.string,
    }),
  ]),
  /**
   * Items to be aligned in the grid. If none are provided nothing is rendered.
   */
  children: PropTypes.node,
  /**
   * Gap between columns. Accepts any of [spacing values](/docs/foundation/spacing-values) as number.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap) for more about `column-gap`.
   */
  columnGap: PropTypes.oneOfType([
    PropTypes.oneOf(SPACING_VALUES),
    PropTypes.shape({
      xs: PropTypes.oneOf(SPACING_VALUES),
      sm: PropTypes.oneOf(SPACING_VALUES),
      md: PropTypes.oneOf(SPACING_VALUES),
      lg: PropTypes.oneOf(SPACING_VALUES),
      xl: PropTypes.oneOf(SPACING_VALUES),
      x2l: PropTypes.oneOf(SPACING_VALUES),
      x3l: PropTypes.oneOf(SPACING_VALUES),
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
      x2l: PropTypes.string,
      x3l: PropTypes.string,
    }),
  ]),
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
      x2l: PropTypes.string,
      x3l: PropTypes.string,
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
      x2l: PropTypes.string,
      x3l: PropTypes.string,
    }),
  ]),
  /**
   * Gap between rows. Accepts any of [spacing values](/docs/foundation/spacing-values) as number.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap) for more about `row-gap`.
   */
  rowGap: PropTypes.oneOfType([
    PropTypes.oneOf(SPACING_VALUES),
    PropTypes.shape({
      xs: PropTypes.oneOf(SPACING_VALUES),
      sm: PropTypes.oneOf(SPACING_VALUES),
      md: PropTypes.oneOf(SPACING_VALUES),
      lg: PropTypes.oneOf(SPACING_VALUES),
      xl: PropTypes.oneOf(SPACING_VALUES),
      x2l: PropTypes.oneOf(SPACING_VALUES),
      x3l: PropTypes.oneOf(SPACING_VALUES),
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
      x2l: PropTypes.string,
      x3l: PropTypes.string,
    }),
  ]),
  /**
   * HTML tag to render. Can be any valid HTML tag of your choice, usually a
   * [block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements).
   */
  tag: PropTypes.string,
};

export const GridWithGlobalProps = withGlobalProps(Grid, 'Grid');

export default GridWithGlobalProps;
