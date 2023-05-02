import React from 'react';
import { withGlobalProps } from '../../provider';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { transferProps } from '../_helpers/transferProps';
import { generateResponsiveCustomProperties } from './_helpers/generateResponsiveCustomProperties';
import styles from './Grid.scss';
import { GridSpanProps } from './Grid.types';

export const GridSpan: React.FunctionComponent<GridSpanProps> = ({
  children,
  columns = 1,
  rows = 1,
  tag: Tag = 'div',
  ...restProps
}) => {
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

export const GridSpanWithGlobalProps = withGlobalProps(GridSpan, 'GridSpan');

export default GridSpanWithGlobalProps;
