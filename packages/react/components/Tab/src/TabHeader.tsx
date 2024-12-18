import React, { Children, isValidElement } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import { useTabContext } from "./TabContext";

interface TabHeaderProps extends React.HTMLAttributes<HTMLUListElement> {
  className?: string;
  children: React.ReactNode[];
}

export const TabHeader = ({ children, className, ...rest }: TabHeaderProps) => {
  const { activeTab, setActiveTab } = useTabContext();

  const childrenWithPropsWithChildWrapper = Children.toArray(children).map(
    (child, index) => {
      if (isValidElement(child)) {
        return (
          <li
            key={index}
            className="relative h-full flex flex-1 justify-between items-center select-none cursor-pointer"
          >
            {/* you can use pio-essential Button Component instead */}
            {/* you can add pio-essential RippleEffect Component */}
            <button
              className="w-full h-full flex justify-center items-center"
              onClick={() => setActiveTab(index)}
            >
              {child}
            </button>
            {index === activeTab ? (
              <motion.span
                layoutId="tab-underline"
                className="absolute -bottom-[1px] left-0 right-0 h-[1px] bg-primary"
                style={{ originY: "0px" }}
              />
            ) : null}
          </li>
        );
      }
      return null;
    }
  );

  return (
    <ul
      className={cn(
        "relative w-full h-full flex justify-between items-center list-none border-b-[1.5px] border-neutral-300 dark:border-neutral-700",
        className
      )}
      {...rest}
    >
      {childrenWithPropsWithChildWrapper}
    </ul>
  );
};
