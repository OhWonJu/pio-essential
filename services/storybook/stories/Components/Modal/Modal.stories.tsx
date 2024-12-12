import React, { useState } from "react";

import {
  ModalBody,
  ModalFooter,
  ModalLayout,
} from "@pio-essential/react-components-modal";

export default {
  title: "React Components/Modal",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    mode: {
      options: ["fade", "slide"],
      control: "select",
      description: "모달 popup animation (fade | optional)",
    },
  },
  args: {
    mode: "fade",
  },
  tags: ["autodocs"],
};

export const ModalStory = {
  render: (args: { mode: "fade" | "slide" }) => {
    const ModalFadeDemo = ({
      isOpen,
      onClose,
    }: {
      isOpen: boolean;
      onClose: () => void;
    }) => {
      const ModalHeader = (
        <span className="text-lg font-semibold">
          {args.mode === "fade" ? "Fade" : "Slide"} Modal
        </span>
      );

      return (
        <ModalLayout
          isOpen={isOpen}
          onClose={onClose}
          mode={args.mode}
          headerComponent={ModalHeader}
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
      const ModalHeader = (
        <span className="text-lg font-semibold">Slide Demo</span>
      );

      return (
        <ModalLayout
          isOpen={isOpen}
          onClose={onClose}
          headerComponent={ModalHeader}
          className="w-full sm:w-[300px] h-full"
          mode="slide"
        >
          <ModalBody>Body</ModalBody>
          <ModalFooter>Footer</ModalFooter>
        </ModalLayout>
      );
    };

    const Renderer = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [modalType, setModalType] = useState<"fade" | "slide">("fade");

      const onClose = () => {
        setIsOpen(false);
      };

      return (
        <div className="relative translate-x-0 flex flex-col justify-center items-center gap-y-4 w-[600px] h-[400px] bg-background overflow-hidden">
          {modalType === "fade" && (
            <ModalFadeDemo isOpen={isOpen} onClose={onClose} />
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
};
