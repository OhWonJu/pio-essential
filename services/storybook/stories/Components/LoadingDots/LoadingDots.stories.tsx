import { LoadingDots } from "@pio-essential/react-components-loadingdots";
import React from "react";

export default {
  title: "React Components/LoadingDots",
  component: LoadingDots,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: "select",
      description: "LoadingDots 크기 (sm | optional)",
    },
  },
  args: {
    size: "sm",
  },
};

export const LoadingDotsStory = {
  render: (args: { size?: "sm" | "md" | "lg" }) => (
    <div className="bg-background p-10">
      <LoadingDots size={args.size} />
    </div>
  ),
};
