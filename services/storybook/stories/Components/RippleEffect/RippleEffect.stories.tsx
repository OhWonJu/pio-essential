import React, { MouseEvent, useRef } from "react";

import {
  RippleEffect,
  RippleRef,
} from "@pio-essential/react-components-ripple-effect";

export default {
  title: "React Components/RippleEffect",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    rippleColor: {
      control: { type: "color" },
      description: "Ripple Effect 색상 (#21212120 | optional)",
    },
  },
};
export const RippleStory = {
  render: (args: { rippleColor: string }) => {
    function RippleEffectRender() {
      const rippleRef = useRef<RippleRef>(null);

      const onClickHandler = (event: MouseEvent<HTMLElement>) => {
        rippleRef.current?.createRipple(event);
      };

      return (
        <div
          onClick={(e) => onClickHandler(e)}
          className="relative w-[500px] h-[200px] border bg-background border-neutral-200 rounded-2xl overflow-hidden"
        >
          <RippleEffect
            ref={rippleRef}
            rippleColor={args.rippleColor ? args.rippleColor : "var(--puls)"}
          />
        </div>
      );
    }

    return <RippleEffectRender />;
  },
};
