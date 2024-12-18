import React from "react";

import { describe, expect, it, vi } from "vitest";
import { act, render, screen, userEvent } from "../../../test/test-utils";

import { composeStories } from "@storybook/react";
import * as stories from "./Modal.stories";

const { ModalTestStory } = composeStories(stories);

describe("Modal 컴포넌트 테스트", () => {
  it("Modal Open 클릭 시 Modal 컴포넌트 활성화 확인", async () => {
    // GIVEN
    vi.useFakeTimers();
    const { container } = render(<ModalTestStory />);

    // WHEN
    const button = screen.getByTestId("open-modal");

    await act(async () => {
      userEvent.click(button);
      await vi.advanceTimersByTimeAsync(301);
    });

    // THEN
    const modalLayout = container.querySelector("#modal-layout");
    expect(modalLayout).toBeInTheDocument();
  });

  it("Modal Container 외부 영역 클릭 시 Modal 컴포넌트 비활성화 확인", async () => {
    // GIVEN
    vi.useFakeTimers();
    const { container } = render(<ModalTestStory />);

    // WHEN
    const button = screen.getByTestId("open-modal");

    await act(async () => {
      userEvent.click(button);
      await vi.advanceTimersByTimeAsync(301);
    });

    const modalLayout = container.querySelector("#modal-layout");
    expect(modalLayout).toBeInTheDocument();

    await act(async () => {
      userEvent.click(document.body);
      await vi.advanceTimersByTimeAsync(301);
    });

    // THEN
    expect(modalLayout).not.toBeInTheDocument();
  });

  it("Modal Close 버튼 클릭 시 Modal 컴포넌트 비활성화 확인", async () => {
    // GIVEN
    vi.useFakeTimers();
    const { container } = render(<ModalTestStory />);

    // WHEN
    const button = screen.getByTestId("open-modal");

    await act(async () => {
      userEvent.click(button);
      await vi.advanceTimersByTimeAsync(301);
    });

    const modalLayout = container.querySelector("#modal-layout");
    const modalCloseButton = container.querySelector("#modal-close-button");
    expect(modalCloseButton).toBeInTheDocument();

    await act(async () => {
      userEvent.click(modalCloseButton!);
      await vi.advanceTimersByTimeAsync(301);
    });

    // THEN
    expect(modalLayout).not.toBeInTheDocument();
  });

  it("Esc 입력시 Modal 컴포넌트 비활성화 확인", async () => {
    // GIVEN
    vi.useFakeTimers();
    const { container } = render(<ModalTestStory />);

    // WHEN
    const button = screen.getByTestId("open-modal");

    await act(async () => {
      userEvent.click(button);
      await vi.advanceTimersByTimeAsync(301);
    });

    const modalLayout = container.querySelector("#modal-layout");

    await act(async () => {
      userEvent.keyboard("{Escape>}");
      await vi.advanceTimersByTimeAsync(301);
    });

    // THEN
    expect(modalLayout).not.toBeInTheDocument();
  });
});
