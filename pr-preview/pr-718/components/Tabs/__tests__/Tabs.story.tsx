import React, { useState } from 'react';
import type { MouseEvent } from 'react';
import {
  Tabs,
  TabsItem,
} from '..';
import type { TabsProps } from '..';

type TabsForTestProps = Omit<TabsProps, 'children'>;

export const TabsForTest = ({
  ...props
}: TabsForTestProps) => {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = (event: MouseEvent<HTMLAnchorElement>, tab: number) => {
    setActiveTab(tab);
    event.preventDefault();
  };

  return (
    <Tabs {...props}>
      <TabsItem
        href="#tab1"
        isActive={activeTab === 1}
        label="Tab1"
        onClick={(event) => navigate(event, 1)}
      />
      <TabsItem
        href="#tab2"
        isActive={activeTab === 2}
        label="Tab2"
        onClick={(event) => navigate(event, 2)}
      />
      <TabsItem
        href="#tab3"
        isActive={activeTab === 3}
        label="Tab3"
        onClick={(event) => navigate(event, 3)}
      />
    </Tabs>
  );
};
