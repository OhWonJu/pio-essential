import React, { useImperativeHandle, useRef, useState } from "react";

import TabContext from "./TabContext";

interface TabProviderProps {
  defaultActiveTab?: number;
  children: React.ReactNode | React.ReactNode[];
}

export type TabRef = {
  activeTab: (index: number) => void;
};

export const TabProvider = React.forwardRef<unknown, TabProviderProps>(
  ({ children, defaultActiveTab = 0 }, ref) => {
    const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);
    const prevActiveTab = useRef(activeTab);

    const handleSetActiveTab = (index: number) => {
      prevActiveTab.current = activeTab;
      setActiveTab(index);
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          activeTab(index: number) {
            handleSetActiveTab(index);
          },
        };
      },
      [ref]
    );

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
  }
);
