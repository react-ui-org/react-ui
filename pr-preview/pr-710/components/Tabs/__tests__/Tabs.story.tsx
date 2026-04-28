import React, { useState } from 'react';
import type { HTMLAttributes } from 'react';
import {
  Tabs,
  TabsItem,
} from '..';

// Types for story component will be improved when we have full TypeScript support
type TabsForTestProps = HTMLAttributes<HTMLElement>;

export const TabsForTest = ({
  ...props
}: TabsForTestProps) => {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = (event: Event, tab: number) => {
    setActiveTab(tab);
    event.preventDefault();
  };

  return (
    <Tabs {...props}>
      <TabsItem
        href="#tab1"
        isActive={activeTab === 1}
        label="Tab1"
        onClick={(e: Event) => navigate(e, 1)}
      />
      <TabsItem
        href="#tab2"
        isActive={activeTab === 2}
        label="Tab2"
        onClick={(e: Event) => navigate(e, 2)}
      />
      <TabsItem
        href="#tab3"
        isActive={activeTab === 3}
        label="Tab3"
        onClick={(e: Event) => navigate(e, 3)}
      />
    </Tabs>
  );
};
