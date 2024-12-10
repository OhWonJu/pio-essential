import { createContext, useContext } from "react";

export type TabContextType = {
  activeTab: number;
  prevActiveTab: number;
  setActiveTab: (index: number) => void;
};

export const TabContext = createContext<TabContextType>({
  activeTab: 0,
  prevActiveTab: 0,
  setActiveTab: () => {},
});

export const useTabContext = () => useContext(TabContext);
export default TabContext;
