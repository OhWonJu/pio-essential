import React from "react";

import { Button } from "@pio-essential/react-components-button";

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
    size: "default",
    variant: "flat",
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
  }) => (
    <div className="bg-background p-10">
      <Button
        variant={args.variant}
        size={args.size}
        disabled={args.disabled}
        loading={args.loading}
        width={args.width}
        onClick={() => console.log("click")}
      >
        <span>🔥</span>
      </Button>
    </div>
  ),
};
