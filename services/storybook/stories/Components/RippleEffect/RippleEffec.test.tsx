import React from "react";

import { describe, expect, it, vi } from "vitest";
import { act, render, screen, userEvent } from "../../../test/test-utils";

import { composeStories } from "@storybook/react";
import * as stories from "./RippleEffect.stories";

const { RippleStory } = composeStories(stories);

describe("RippleEffect 컴포넌트 테스트", () => {
  it("RippleEffect Trigger 시 이펙트 생성 확인", async () => {
    // GIVEN
    vi.useFakeTimers();
    render(<RippleStory />);

    // WHEN
    const button = screen.getByTestId("ripple-trigger");

    await act(async () => {
      userEvent.click(button);
      await vi.advanceTimersByTimeAsync(10);
    });

    // THEN
    const rippleEffectContainer = button.querySelector("span");
    expect(rippleEffectContainer?.hasChildNodes()).toBeTruthy();
  });
});
