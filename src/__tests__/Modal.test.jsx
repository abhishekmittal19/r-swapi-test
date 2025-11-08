import React from "react";
import { render, screen } from "@testing-library/react";
import CharacterModal from "../components/CharacterModal";

test("renders modal with character info", () => {
  render(
    <CharacterModal
      isOpen={true}
      onClose={() => {}}
      character={{ name: "Luke Skywalker" }}
      homeworld="Tatooine"
    />
  );

  expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  expect(screen.getByText("Tatooine")).toBeInTheDocument();
  expect(screen.getByText("Close")).toBeInTheDocument();
});

beforeAll(() => {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
});

afterAll(() => {
  const root = document.getElementById("root");
  if (root) document.body.removeChild(root);
});
