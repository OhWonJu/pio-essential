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
  createRipple: (event: MouseEvent) => void;
};

export const RippleEffect = forwardRef(
  ({ rippleColor }: RippleEffectProps, ref) => {
    const rippleContainerRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          createRipple(event: MouseEvent<HTMLElement>) {
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
      [rippleContainerRef]
    );

    return <span ref={rippleContainerRef} />;
  }
);
