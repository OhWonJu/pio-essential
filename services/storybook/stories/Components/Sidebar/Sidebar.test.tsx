import React from "react";

import { describe, expect, it, vi } from "vitest";
import { act, render, screen, userEvent } from "../../../test/test-utils";

import { composeStories } from "@storybook/react";
import * as stories from "./Sidebar.stories";

const { SidebarStory } = composeStories(stories);

describe("Sidebar 컴포넌트 테스트", () => {
  it("Sidebar Open 클릭 시 Sidebar Component 활성화 확인", async () => {
    // GIVEN
    vi.useFakeTimers();
    const { container } = render(<SidebarStory />);

    // WHEN
    const button = screen.getByTestId("open-sidebar");

    await act(async () => {
      userEvent.click(button);
      await vi.advanceTimersByTimeAsync(301);
    });

    // THEN
    const sidebarLayout = container.querySelector("#sidebar-layout");
    expect(sidebarLayout).toBeInTheDocument();
  });

  it("Sidebar Container 외부 영역 클릭 시 Sidebar 컴포넌트 비활성화 확인", async () => {
    // GIVEN
    vi.useFakeTimers();
    const { container } = render(<SidebarStory />);

    // WHEN
    const button = screen.getByTestId("open-sidebar");

    await act(async () => {
      userEvent.click(button);
      await vi.advanceTimersByTimeAsync(301);
    });

    const sidebarLayout = container.querySelector("#sidebar-layout");
    expect(sidebarLayout).toBeInTheDocument();

    await act(async () => {
      userEvent.click(document.body);
      await vi.advanceTimersByTimeAsync(301);
    });

    // THEN
    expect(sidebarLayout).not.toBeInTheDocument(); // 모달이 DOM에서 제거되었는지 확인
  });

  it("Sidebar Close 버튼 클릭 시 Sidebar 컴포넌트 비활성화 확인", async () => {
    // GIVEN
    vi.useFakeTimers();
    const { container } = render(<SidebarStory />);

    // WHEN
    const button = screen.getByTestId("open-sidebar");

    await act(async () => {
      userEvent.click(button);
      await vi.advanceTimersByTimeAsync(301);
    });

    const sidebarLayout = container.querySelector("#sidebar-layout");
    const sidebarCloseButton = container.querySelector("#sidebar-close-button");
    expect(sidebarCloseButton).toBeInTheDocument();

    await act(async () => {
      userEvent.click(sidebarCloseButton!);
      await vi.advanceTimersByTimeAsync(301);
    });

    // THEN
    expect(sidebarLayout).not.toBeInTheDocument();
  });

  it("Esc 입력시 Sidebar 컴포넌트 비활성화 확인", async () => {
    // GIVEN
    vi.useFakeTimers();
    const { container } = render(<SidebarStory />);

    // WHEN
    const button = screen.getByTestId("open-sidebar");

    await act(async () => {
      userEvent.click(button);
      await vi.advanceTimersByTimeAsync(301);
    });

    const sidebarLayout = container.querySelector("#sidebar-layout");

    await act(async () => {
      userEvent.keyboard("{Escape>}");
      await vi.advanceTimersByTimeAsync(301);
    });

    // THEN
    expect(sidebarLayout).not.toBeInTheDocument(); // 모달이 DOM에서 제거되었는지 확인
  });
});
