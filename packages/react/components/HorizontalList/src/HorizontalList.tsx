import React, { ButtonHTMLAttributes, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

interface HorizontalListProps extends ButtonHTMLAttributes<HTMLSelectElement> {
  title?: string;
  hasMore?: boolean;
  hasMoreGuide?: string;
  hasMoreAction?: () => void;
  exceptionGuide?: string;
  exceptionAction?: () => void;
  singleLine?: boolean;
  maxHeight?: number;
  renderer?: () => JSX.Element[] | undefined;
  className?: string;
}

export const HorizontalList = ({
  title,
  hasMore = true,
  hasMoreGuide = "더보기",
  hasMoreAction,
  exceptionGuide,
  exceptionAction,
  singleLine = false,
  maxHeight = 400,
  renderer,
  className,
  ...rest
}: HorizontalListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const isGrabbing = useHorizontalScroll(listRef);

  const RenderedItems = useMemo(() => renderer?.(), [renderer]);

  return (
    <section
      className={cn("flex flex-col w-full select-none", className)}
      {...rest}
    >
      {(title || hasMore) && (
        <div className="flex flex-row w-full justify-between items-center mb-4">
          <strong className="text-3xl sm:text-4xl font-bold">{title}</strong>
          {hasMore && (
            <span
              role="button"
              onClick={hasMoreAction}
              className="text-primary-foreground font-semibold text-sm p-1"
            >
              {hasMoreGuide}
            </span>
          )}
        </div>
      )}
      <div
        ref={listRef}
        className={cn(
          `relative flex content-start w-full  overflow-x-scroll scrollbar-hide gap-x-3 gap-y-4`,
          singleLine ? "flex-row" : "flex-col flex-wrap",
        )}
        style={{
          maxHeight,
        }}
      >
        {(!RenderedItems || RenderedItems?.length < 1) && (
          <div className="h-[200px] w-full text-center content-center text-primary-foreground font-semibold">
            <span onClick={exceptionAction} className="cursor-pointer">
              {exceptionGuide}
            </span>
          </div>
        )}
        {RenderedItems}
        <div
          className={cn(
            "absolute top-0 left-0 h-full bg-transparent",
            !isGrabbing && "hidden",
          )}
          style={{ width: listRef.current?.scrollWidth }}
        />
      </div>
    </section>
  );
};
