import React from 'react';
import type { HTMLAttributes } from 'react';
import {
  Toolbar,
  ToolbarItem,
} from '..';

// Types for story component will be improved when we have full TypeScript support
type ToolbarTestProps = HTMLAttributes<HTMLFieldSetElement>;

export const ToolbarForTest = ({
  ...props
}: ToolbarTestProps) => (
  <Toolbar {...props}>
    <ToolbarItem>
      <div
        style={{
          border: '1px solid black',
          width: 100,
        }}
      >
        Item 1
        <br />
        New line
      </div>
    </ToolbarItem>
    <ToolbarItem>
      <div
        style={{
          border: '1px solid black',
          width: 100,
        }}
      >
        Item 2
      </div>
    </ToolbarItem>
  </Toolbar>
);

export const ToolbarWithFlexibleItemForTest = ({
  ...props
}: ToolbarTestProps) => (
  <Toolbar {...props}>
    <ToolbarItem>
      <div style={{ border: '1px solid black' }}>Item 1</div>
    </ToolbarItem>
    <ToolbarItem flexible>
      <div style={{ border: '1px solid black' }}>Item 2</div>
    </ToolbarItem>
  </Toolbar>
);

export const ToolbarWithoutChildrenForTest = ({
  ...props
}: ToolbarTestProps) => (
  <Toolbar {...props} />
);
