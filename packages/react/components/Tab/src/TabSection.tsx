import React, { Children, CSSProperties, PropsWithChildren } from "react";
import { AnimatePresence, motion } from "motion/react";

import { useTabContext } from "./TabContext";

interface TabSectionProps {
  className?: string;
  useAnimation?: boolean;
  distance?: number;
  duration?: number;
  style?: CSSProperties;
}

export const TabSection = ({
  children,
  className,
  useAnimation = true,
  distance = 10,
  duration = 0.2,
  style,
}: PropsWithChildren<TabSectionProps>) => {
  const { activeTab, prevActiveTab } = useTabContext();

  const childrenWithProps = Children.toArray(children);

  const animationProps = useAnimation
    ? {
        initial: {
          x:
            prevActiveTab === activeTab
              ? 0
              : prevActiveTab < activeTab
              ? distance
              : -distance,
          opacity: 0,
        },
        animate: { x: 0, opacity: 1 },
        transition: { duration },
      }
    : {};

  return (
    <AnimatePresence>
      <div className="relative">
        <motion.section
          key={activeTab ? activeTab : -1}
          {...animationProps}
          className={className}
          style={{ originY: "0px", ...style }}
        >
          {activeTab >= 0 && activeTab < childrenWithProps.length
            ? childrenWithProps[activeTab]
            : null}
        </motion.section>
      </div>
    </AnimatePresence>
  );
};
