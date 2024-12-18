import React, { MouseEvent, useRef } from "react";

import {
  RippleEffect,
  RippleRef,
} from "@pio-essential/react-components-ripple-effect";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RippleEffect> = {
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

export default meta;
type Story = StoryObj<typeof RippleEffect>;

export const RippleStory: Story = {
  render: (args) => {
    function RippleEffectRender() {
      const rippleRef = useRef<RippleRef>(null);

      const onClickHandler = (event: MouseEvent<HTMLElement>) => {
        rippleRef.current?.createRipple(event);
      };

      return (
        <div
          data-testid="ripple-trigger"
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
