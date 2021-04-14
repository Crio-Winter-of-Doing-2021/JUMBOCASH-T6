import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';

const ItemsTabView = ({items}) => {
  const TabPanels = items.map(({header,content})=><TabPanel key={header} header={header}>{content}</TabPanel>)
  return (
    <TabView>
      {TabPanels}
    </TabView>
  );
};

export default ItemsTabView;
