import React, {
  forwardRef,
  MouseEvent,
  useImperativeHandle,
  useRef,
} from "react";

import styles from "./rippleEffect.module.css";

interface RippleEffectProps {
  rippleColor?: string;
}

export type RippleRef = {
  createRipple: (event: MouseEvent<Element>) => void;
};

export const RippleEffect = forwardRef<RippleRef, RippleEffectProps>(
  ({ rippleColor }, ref) => {
    const rippleContainerRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          createRipple(event: MouseEvent<Element>) {
            const button = event.currentTarget;
            const circle = document.createElement("i");
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            circle.style.width = `${diameter}px`;
            circle.style.height = `${diameter}px`;
            circle.style.left = `${
              event.clientX - button.getBoundingClientRect().left - radius
            }px`;
            circle.style.top = `${
              event.clientY - button.getBoundingClientRect().top - radius
            }px`;

            // If you are using a color theme, recommend using color from theme.
            circle.style.backgroundColor = rippleColor
              ? rippleColor
              : "#21212120"; // ex) var(--puls)

            circle.classList.add(styles.ripple);

            const existingRipple = button.querySelector(`.${styles.ripple}`);

            if (existingRipple) {
              existingRipple.remove();
            }

            rippleContainerRef.current?.appendChild(circle);
          },
        };
      },
      [rippleContainerRef, rippleColor]
    );

    return <span ref={rippleContainerRef} />;
  }
);

RippleEffect.displayName = "RippleEffect";
