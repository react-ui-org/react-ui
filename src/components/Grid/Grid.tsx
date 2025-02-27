import React, { JSX } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { generateResponsiveCustomProperties } from './_helpers/generateResponsiveCustomProperties';
import { GridProps } from './Grid.types';
import styles from './Grid.module.scss';

export const Grid: React.FunctionComponent<GridProps> = ({
  alignContent,
  alignItems,
  autoFlow,
  children,
  columnGap = 4,
  columns = '1fr',
  justifyContent,
  justifyItems,
  rowGap = 4,
  rows = 'auto',
  tag: Tag = 'div',
  ...restProps
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  const TagElement = Tag as unknown as keyof JSX.IntrinsicElements;

  return (
    <TagElement
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
    </TagElement>
  );
};

export const GridWithGlobalProps = withGlobalProps(Grid, 'Grid');

export default GridWithGlobalProps;
