import React from 'react';
import type { HTMLAttributes } from 'react';
import './Grid.tests.scss';

import {
  Grid,
  GridSpan,
} from '..';
import {
  Card,
  CardBody,
} from '../../Card';

// Types for story component will be improved when we have full TypeScript support
type GridTestProps = HTMLAttributes<HTMLElement>;

const GridComponent = ({ children }: { children: React.ReactNode }) => (
  <Card>
    <CardBody>
      {children}
    </CardBody>
  </Card>
);

export const GridForTest = ({
  ...props
}: GridTestProps) => (
  <Grid {...props}>
    <GridComponent>Component1</GridComponent>
    <GridComponent>Component2</GridComponent>
    <GridComponent>
      Component3
      <br />
      with two lines
    </GridComponent>
    <GridComponent>Component4</GridComponent>
    <GridComponent>Component5</GridComponent>
    <GridComponent>Component6</GridComponent>
  </Grid>
);

export const GridWithFixedCardsHeightForTest = ({
  ...props
}: GridTestProps) => (
  <Grid {...props}>
    <div style={{ height: '50px' }}>
      <GridComponent>Component1</GridComponent>
    </div>
    <div style={{ height: '50px' }}>
      <GridComponent>Component2</GridComponent>
    </div>
    <div style={{ height: '80px' }}>
      <GridComponent>
        Component3
        <br />
        with two lines
      </GridComponent>
    </div>
    <div style={{ height: '50px' }}>
      <GridComponent>Component4</GridComponent>
    </div>
    <div style={{ height: '50px' }}>
      <GridComponent>Component5</GridComponent>
    </div>
    <div style={{ height: '50px' }}>
      <GridComponent>Component6</GridComponent>
    </div>
  </Grid>
);

export const GridWithGridSpanForTest = ({
  ...props
}: GridTestProps) => (
  <Grid {...props}>
    <GridComponent>Component1</GridComponent>
    <GridComponent>Component2</GridComponent>
    <GridSpan columns={2} rows={2}>
      <GridComponent>Component3</GridComponent>
    </GridSpan>
    <GridComponent>Component4</GridComponent>
    <GridComponent>Component5</GridComponent>
  </Grid>
);

export const GridWithoutChildrenForTest = ({
  ...props
}: GridTestProps) => (
  <Grid {...props} />
);
