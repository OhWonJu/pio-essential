import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/useOutsideClick";

import { Cross } from "@/components/icons/Cross";

interface ModalLayoutProps {
  headerComponent?: React.ReactNode | React.ReactNode[];
  disabled?: boolean;
  isOpen: boolean;
  className?: string;
  mode?: "slide" | "fade";
  onClose: () => void;
}

export const ModalLayout = ({
  children,
  headerComponent,
  disabled,
  isOpen,
  className,
  mode = "fade",
  onClose,
}: PropsWithChildren<ModalLayoutProps>) => {
  const [showModal, setShowModal] = useState(false);

  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  console.log("cn: ", useOutsideClick);
  console.log("???: ", useOutsideClick);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300); // for animation
  }, [disabled, onClose]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        return handleClose();
      }
    },
    [onClose],
  );

  useOutsideClick(showModal, containerRef, handleClose);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modal = ref.current;

    if (!modal) return;

    disableBodyScroll(modal, { reserveScrollBarGap: false });
    window.addEventListener("keydown", handleKey);

    return () => {
      clearAllBodyScrollLocks();
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={ref}
        role="dialog"
        className="fixed inset-0 flex justify-center items-center z-[99999] outline-none focus:outline-none bg-neutral-800/10 backdrop-blur-sm"
      >
        <div
          ref={containerRef}
          className={cn(
            "relative flex flex-col min-w-[300px] min-h-[300px] bg-background border overflow-hidden rounded-lg shadow-md border-neutral-300 dark:border-neutral-700 duration-300 transform-gpu",
            showModal ? "opacity-100" : "opacity-0",
            showModal && mode === "slide" && "translate-y-0",
            !showModal && mode === "slide" && "translate-y-full",
            className,
          )}
        >
          <section className="relative flex justify-center items-center p-6">
            {headerComponent}
            <button
              onClick={handleClose}
              className="p-1 border-0 hover:opacity-70 transition absolute right-4"
            >
              <Cross className="w-6 h-6" strokeWidth={2} />
            </button>
          </section>
          {children}
        </div>
      </div>
    </>
  );
};
