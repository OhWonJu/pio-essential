import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  ModalBody,
  ModalFooter,
  ModalLayout,
} from "@pio-essential/react-components-modal";

const meta: Meta<typeof ModalLayout> = {
  title: "React Components/Modal",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    mode: {
      options: ["fade", "slide"],
      control: { type: "select" },
      description: "모달 popup animation (fade | optional)",
    },
  },
  args: {
    mode: "fade",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ModalLayout>;

const ModalFadeDemo = ({
  isOpen,
  onClose,
  mode = "fade",
}: {
  isOpen: boolean;
  onClose: () => void;
  mode?: "fade" | "slide";
}) => {
  const DefaultModalHeader = (
    <span className="text-lg font-semibold">
      {mode === "fade" ? "Fade" : "Slide"} Modal
    </span>
  );

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      mode={mode}
      headerComponent={DefaultModalHeader}
    >
      <ModalBody>Body</ModalBody>
      <ModalFooter>Footer</ModalFooter>
    </ModalLayout>
  );
};

const ModalSlideDemo = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const SlideModalHeader = (
    <span className="text-lg font-semibold">Slide Demo</span>
  );

  return (
    <ModalLayout
      data-testId="modal-layout"
      isOpen={isOpen}
      onClose={onClose}
      headerComponent={SlideModalHeader}
      className="w-full sm:w-[300px] h-full"
      mode="slide"
    >
      <ModalBody>Body</ModalBody>
      <ModalFooter>Footer</ModalFooter>
    </ModalLayout>
  );
};

export const ModalStory: Story = {
  render: (args) => {
    const Renderer = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [modalType, setModalType] = useState<"fade" | "slide">("fade");

      const onClose = () => {
        setIsOpen(false);
      };

      return (
        <div className="relative translate-x-0 flex flex-col justify-center items-center gap-y-4 w-[600px] h-[400px] bg-background overflow-hidden">
          {modalType === "fade" && (
            <ModalFadeDemo isOpen={isOpen} onClose={onClose} mode={args.mode} />
          )}
          {modalType === "slide" && (
            <ModalSlideDemo isOpen={isOpen} onClose={onClose} />
          )}
          <button
            className="w-[80%] border p-4 rounded-md"
            onClick={() => {
              setIsOpen(true);
              setModalType("fade");
            }}
          >
            Open Default Modal!
          </button>
          <button
            className="w-[80%] border p-4 rounded-md"
            onClick={() => {
              setIsOpen(true);
              setModalType("slide");
            }}
          >
            Open Slide Modal!
          </button>
        </div>
      );
    };

    return <Renderer />;
  },
  args: {
    mode: "fade",
  },
};

export const ModalTestStory: Story = {
  render: () => {
    const Renderer = () => {
      const [isOpen, setIsOpen] = useState(false);

      const onClose = () => {
        setIsOpen(false);
      };

      return (
        <div className="relative translate-x-0 flex flex-col justify-center items-center gap-y-4 w-[600px] h-[400px] bg-background overflow-hidden">
          <ModalFadeDemo isOpen={isOpen} onClose={onClose} />
          <button
            data-testid="open-modal"
            className="w-[80%] border p-4 rounded-md"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Open Modal!
          </button>
        </div>
      );
    };

    return <Renderer />;
  },
};
