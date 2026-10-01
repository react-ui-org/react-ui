import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import { generateResponsiveCustomProperties } from './_helpers/generateResponsiveCustomProperties';
import styles from './Grid.module.scss';
import type { GridProps } from './Grid.types';

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
}: GridProps) => {
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

export const GridWithGlobalProps = withGlobalProps<GridProps, HTMLElement>(Grid, 'Grid');

export default GridWithGlobalProps;
