import React, { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface SidebarBodyProps {
  className?: string;
}

export const SidebarBody = ({
  children,
  className,
}: PropsWithChildren<SidebarBodyProps>) => {
  return (
    <section
      className={cn(
        "relative flex flex-col flex-1 p-4 overflow-y-scroll",
        className,
      )}
    >
      {children}
    </section>
  );
};
