import { ReactElement } from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeAll } from "vitest";

import "@testing-library/jest-dom";

import { setProjectAnnotations } from "@storybook/react";
import * as previewAnnotations from "../.storybook/preview";

const annotations = setProjectAnnotations([previewAnnotations]);

beforeAll(annotations.beforeAll);

afterEach(() => {
  cleanup();
});

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, { wrapper: ({ children }) => children, ...options });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

export { customRender as render };
