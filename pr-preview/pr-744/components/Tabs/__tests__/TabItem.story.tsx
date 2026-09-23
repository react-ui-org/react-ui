import React from 'react';
import {
  Tabs,
  TabsItem,
} from '..';
import type { TabsItemProps } from '..';
import type { StoryProps } from '../../../../tests/playwright';

type TabItemForTestProps = StoryProps<TabsItemProps, 'href' | 'label'>;

export const TabItemForTest = ({
  href = '#tab1',
  label = 'Tab1',
  ...props
}: TabItemForTestProps) => (
  <Tabs>
    <TabsItem
      href={href}
      label={label}
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  </Tabs>
);
