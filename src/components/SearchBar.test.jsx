import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect } from "vitest";
import React, { useState } from "react";

const SearchBar = ({ search, setSearch }) => (
  <input
    type="text"
    placeholder="Search characters"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
);

test("updates search input correctly", () => {
  const Wrapper = () => {
    const [search, setSearch] = useState("");
    return <SearchBar search={search} setSearch={setSearch} />;
  };

  render(<Wrapper />);
  const input = screen.getByPlaceholderText(/search characters/i);
  fireEvent.change(input, { target: { value: "Luke" } });
  expect(input.value).toBe("Luke");
});
