import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  SidebarBody,
  SidebarFooter,
  SidebarLayout,
} from "@pio-essential/react-components-sidebar";

const meta: Meta<typeof SidebarLayout> = {
  title: "React Components/Sidebar",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    align: {
      options: ["left", "right"],
      control: "select",
      description: "Sidebar 배치 위치 (left | optional)",
    },
    maxWidth: {
      control: "number",
      description: "Sidebar 기본 넓이 및 최대 넓이 px (400 | optional)",
    },
    minWidth: {
      control: "number",
      description: "Sidebar 최소 넓이 px (200 | optional)",
    },
    outsideClickClose: {
      control: "boolean",
      description:
        "Sidebar 외부 클릭으로 Sidebar 닫기 활성화 (true | optional)",
    },
    resizeable: {
      control: "boolean",
      description: "Sidebar 넓이 조절 활성화 (true | optional)",
    },
  },
  args: {
    align: "left",
    maxWidth: 400,
    minWidth: 200,
    outsideClickClose: true,
    resizeable: true,
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SidebarLayout>;

export const SidebarStory: Story = {
  render: (args) => {
    const SidebarDemo = ({
      isOpen,
      onClose,
    }: {
      isOpen: boolean;
      onClose: () => void;
    }) => {
      const SidebarHeader = (
        <span className="text-lg font-semibold">Sidebar</span>
      );

      return (
        <SidebarLayout
          isOpen={isOpen}
          onClose={onClose}
          headerComponent={SidebarHeader}
          align={args.align}
          maxWidth={args.maxWidth}
          minWidth={args.minWidth}
          resizeable={args.resizeable}
          outsideClickClose={args.outsideClickClose}
        >
          <SidebarBody>Body</SidebarBody>
          <SidebarFooter>Footer</SidebarFooter>
        </SidebarLayout>
      );
    };

    const Renderer = () => {
      const [isOpen, setIsOpen] = useState(false);

      const onClose = () => {
        setIsOpen(false);
      };

      return (
        <div className="relative translate-x-0 flex flex-col justify-center items-center gap-y-4 w-[600px] h-[400px] bg-background overflow-hidden">
          <SidebarDemo isOpen={isOpen} onClose={onClose} />
          <button
            data-testid="open-sidebar"
            className="w-[80%] border p-4 rounded-md"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Open Sidebar
          </button>
        </div>
      );
    };

    return <Renderer />;
  },
};
