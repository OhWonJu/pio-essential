import React, { MouseEvent, MouseEventHandler, useRef } from "react";

import { Button } from "@pio-essential/react-components-button";
import {
  RippleEffect,
  RippleRef,
} from "@pio-essential/react-components-ripple-effect";

export default {
  title: "React Components/Button",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: "select",
      description: "버튼 크기 (default | optional)",
    },
    width: {
      control: "number",
      description:
        "버튼 넓이 명시 값 - 1 이하 값의 경우 백분율로 치환 (content size | optional)",
    },
    variant: {
      options: ["flat", "plain", "ghost", "outline", "link", "disabled"],
      control: "select",
      description: "버튼 스타일 (flat | optional)",
    },
    disabled: {
      control: "boolean",
      description: "버튼 비활성화 (false | optional)",
    },
    loading: {
      control: "boolean",
      description: "로딩 상태 활성화 (false | optional)",
    },
  },
  args: {
    variant: "flat",
    size: "default",
    disabled: false,
    loading: false,
  },
};

export const ButtonStory = {
  render: (args: {
    size: "default" | "sm" | "lg" | "icon";
    variant: "flat" | "plain" | "ghost" | "outline" | "link" | "disabled";
    disabled: boolean;
    loading: boolean;
    width?: number;
  }) => {
    const clickHandler = () => {
      console.log("click");
    };

    return (
      <div className="bg-background p-10">
        <Button
          variant={args.variant}
          size={args.size}
          disabled={args.disabled}
          loading={args.loading}
          width={args.width}
          onClick={clickHandler}
        >
          <span>{args.size === "icon" ? "🔥" : "Click!"}</span>
        </Button>
      </div>
    );
  },
};

export const ButtonWithRipple = {
  render: () => {
    const rippleRef = useRef<RippleRef>(null);

    const clickHandler = (event: MouseEvent) => {
      rippleRef.current?.createRipple(event);
      console.log("click");
    };

    return (
      <div className="bg-background p-10">
        <Button
          variant={"plain"}
          size={"icon"}
          onClick={clickHandler}
          className="w-16 h-16 text-3xl border border-neutral-300 dark:border-neutral-700"
        >
          <RippleEffect ref={rippleRef} rippleColor={"var(--puls)"} />
          <span>🌊</span>
        </Button>
      </div>
    );
  },
};
