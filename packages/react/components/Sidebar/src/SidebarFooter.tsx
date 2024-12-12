import React, { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface SidebarFooterProps {
  className?: string;
}

export const SidebarFooter = ({
  children,
  className,
}: PropsWithChildren<SidebarFooterProps>) => {
  return (
    <section className={cn("relative flex p-4", className)}>{children}</section>
  );
};
