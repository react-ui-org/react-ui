import React from 'react';
import { Paper } from '..';
import type { PaperProps } from '..';
import type { StoryProps } from '../../../../tests/playwright';

type PaperForTestProps = StoryProps<PaperProps, 'children'>;

export const PaperForTest = ({
  ...props
}: PaperForTestProps) => (
  <div style={{ padding: '20px' }}>
    <Paper {...props}>
      This is a paper component.
    </Paper>
  </div>
);
