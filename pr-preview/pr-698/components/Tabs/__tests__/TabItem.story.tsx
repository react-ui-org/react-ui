import React from 'react';
import type { HTMLAttributes } from 'react';
import {
  Tabs,
  TabsItem,
} from '..';

// Types for story component will be improved when we have full TypeScript support
type TabItemForTestProps = HTMLAttributes<HTMLLIElement>;

export const TabItemForTest = ({
  ...props
}: TabItemForTestProps) => (
  <Tabs>
    <TabsItem
      href="#tab1"
      label="Tab1"
      onClick={(e: Event) => {
        e.preventDefault();
      }}
      {...props}
    />
  </Tabs>
);
