import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./componets/navbar/NavBar";

describe(" Renders NavBar", async () => {
  it("Should render the page correctly", async () => {
    // Setup
    await render(<NavBar />, { wrapper: BrowserRouter });
    const h1 = await screen.queryByText("Fetch Your Friend");

    // Post Expectations
    expect(h1).not.toBeNull();
  });
});
