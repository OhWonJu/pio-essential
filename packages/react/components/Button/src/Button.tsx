import {
  forwardRef,
  ButtonHTMLAttributes,
  MouseEvent,
  useCallback,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { LoadingDots } from "@/components/ui/LoadingDots";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  className?: string;
  variant?: "flat" | "plain" | "ghost" | "outline" | "link" | "disabled";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  children: any;
  width?: number;
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const buttonVariants = cva(
  "relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm border border-transparent font-medium ring-offset-0 transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        flat: "bg-primary hover:bg-neutral-800/80 hover:dark:bg-neutral-100/80 text-secondary",
        plain: "",
        ghost:
          "flex justify-center items-center border shadow hover:shadow-inner transition-shadow border-neutral-200/50 dark:border-neutral-700",
        outline:
          "border border-primary-foreground hover:bg-neutral-200/80 hover:dark:bg-neutral-600/80",
        link: "underline underline-offset-[0.5rem] hover:text-primary-foreground",
        disabled:
          "text-neutral-50 dark:text-neutral-400 border border-transparent bg-neutral-300 dark:bg-neutral-700",
      },
      size: {
        default: "h-10 px-4 py-2 text-base",
        sm: "h-9 px-3 text-xs",
        lg: "h-14 px-8 text-lg",
        icon: "h-10 w-10 text-base rounded-full",
      },
    },
  },
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, buttonRef) => {
    const {
      className,
      variant = "flat",
      active,
      width,
      loading = false,
      disabled = false,
      style = {},
      children,
      size = "default",
      type = "button",
      onClick,
      ...rest
    } = props;

    const _variant = disabled ? "disabled" : variant;
    const _width = width ? (width <= 1 ? `${width * 100}%` : width) : undefined;
    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();

        onClick();
      },
      [onClick],
    );

    return (
      <button
        aria-pressed={active}
        data-variant={_variant}
        ref={buttonRef}
        className={cn(buttonVariants({ variant: _variant, size, className }))}
        disabled={disabled || loading}
        style={{
          width: _width,
          ...style,
        }}
        type={type}
        onClick={handleClick}
        {...rest}
      >
        {loading ? <LoadingDots /> : <>{children}</>}
      </button>
    );
  },
);
