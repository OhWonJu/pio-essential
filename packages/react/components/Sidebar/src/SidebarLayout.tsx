import React, {
  ElementRef,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";

import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/useOutsideClick";

import { ChevronLeft } from "@/components/icons/ChevronLeft";
import { ChevronRight } from "@/components/icons/ChevronRight";

interface SidebarLayoutProps {
  headerComponent?: React.ReactNode | React.ReactNode[];
  disabled?: boolean;
  resizeable?: boolean;
  minWidth?: number;
  maxWidth?: number;
  isOpen: boolean;
  outsideClickClose?: boolean;
  onClose: () => void;
  className?: string;
  align?: "left" | "right";
}

const DURATION = 300;

export const SidebarLayout = ({
  children,
  headerComponent,
  disabled,
  minWidth = 200,
  maxWidth = 400,
  isOpen,
  outsideClickClose = true,
  onClose,
  resizeable = true,
  className,
  align = "left",
}: PropsWithChildren<SidebarLayoutProps>) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const isResizeingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);

  const collapse = () => {
    if (sidebarRef.current) {
      setIsResetting(true);

      sidebarRef.current.style.width = "0";

      setTimeout(() => setIsResetting(false), DURATION);
    }
  };

  const handleClose = useCallback(() => {
    if (disabled) return;

    collapse();
    setShowSidebar(false);
    setTimeout(() => onClose(), DURATION);
  }, [disabled, onClose]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        return handleClose();
      }
    },
    [onClose],
  );

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!resizeable) return;

    isResizeingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizeingRef.current) return;
    if (!resizeable) return;

    let newWidth =
      align === "left" ? event.clientX : event.view!.innerWidth - event.clientX;

    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;

    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
    }
  };

  const handleMouseUp = () => {
    if (!resizeable) return;

    isResizeingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current) {
      setIsResetting(true);

      sidebarRef.current.style.width = `${maxWidth}px`;

      setTimeout(() => setIsResetting(false), DURATION);
    }
  };

  useOutsideClick(showSidebar && outsideClickClose, sidebarRef, handleClose);

  useEffect(() => {
    setShowSidebar(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const sidebar = sidebarRef.current;

    if (sidebar) {
      disableBodyScroll(sidebar, { reserveScrollBarGap: false });
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      clearAllBodyScrollLocks();
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  useEffect(() => {
    resetWidth();
  }, [sidebarRef.current]);

  if (!isOpen) return null;

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "group/sidebar fixed flex flex-col top-0 h-full bg-background z-[99999] overflow-hidden shadow-lg border-l border-r border-neutral-200/50 dark:border-neutral-700 transform-gpu duration-300",
        showSidebar ? "opacity-100" : "opacity-0",
        align === "left" ? "left-0" : "right-0",
        showSidebar && align === "left" && "translate-x-0",
        !showSidebar && align === "left" && "-translate-x-full",
        showSidebar && align === "right" && "translate-x-0",
        !showSidebar && align === "right" && "translate-x-full",
        isResetting && "transition-all ease-in-out duration-300",
        className,
      )}
    >
      <section className="relative flex justify-center items-center min-h-[60px] p-4">
        {headerComponent}
        <button
          onClick={handleClose}
          className={cn(
            "absolute p-1 border-0 hover:opacity-70 transition",
            align === "left" && "left-4",
            align === "right" && "right-4",
          )}
        >
          {align === "left" ? (
            <ChevronLeft className="w-6 h-6" strokeWidth={2} />
          ) : (
            <ChevronRight className="w-6 h-6" strokeWidth={2} />
          )}
        </button>
      </section>
      {children}
      {resizeable && (
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className={cn(
            "opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-neutral-300/50 dark:bg-neutral-600/50 top-0",
            align === "left" && "right-0",
            align === "right" && "left-0",
          )}
        />
      )}
    </aside>
  );
};
