import React from 'react';
import type { HTMLAttributes } from 'react';
import { Paper } from '..';

// Types for story component will be improved when we have full TypeScript support
type PaperForTestProps = HTMLAttributes<HTMLDivElement>;

export const PaperForTest = ({
  ...props
}: PaperForTestProps) => (
  <div style={{ padding: '20px' }}>
    <Paper {...props}>
      This is a paper component.
    </Paper>
  </div>
);
