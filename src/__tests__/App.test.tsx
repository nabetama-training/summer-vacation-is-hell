import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, screen } from "@testing-library/react";

import App from "../App";
import { DateTime, Settings } from "luxon";

let container: HTMLDivElement | null = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);

  const expectedNow = DateTime.local(2022, 7, 22);
  Settings.now = () => expectedNow.toMillis();
});

afterEach(() => {});
it("changes value when clicked", () => {
  act(() => {
    render(<App />, container);
  });

  const inputStartDate: HTMLFormElement = document.querySelector(
    "[data-testid=start-date]"
  )!;
  const inputEndDate: HTMLFormElement = document.querySelector(
    "[data-testid=end-date]"
  )!;
  expect(inputStartDate.value).toBe("2022-07-21");
  expect(inputEndDate.value).toBe("2022-08-20");

  expect(screen.getByText("3%")).toBeInTheDocument;
});
