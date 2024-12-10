import React, { useRef, useState } from "react";

import TabContext from "./TabContext";

interface TabProviderProps {
  defaultActiveTab?: number;
  children: React.ReactNode | React.ReactNode[];
}

export const TabProvider = ({
  children,
  defaultActiveTab = 0,
}: TabProviderProps) => {
  const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);
  const prevActiveTab = useRef(activeTab);

  const handleSetActiveTab = (index: number) => {
    prevActiveTab.current = activeTab;
    setActiveTab(index);
  };

  return (
    <TabContext.Provider
      value={{
        activeTab,
        prevActiveTab: prevActiveTab.current,
        setActiveTab: handleSetActiveTab,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};
