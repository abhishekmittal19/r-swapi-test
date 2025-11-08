// src/components/CharacterCard.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import CharacterCard from "./CharacterCard";

// Mock data
const mockCharacter = {
  name: "Luke Skywalker",
  species: ["Human"],
  homeworld: "Tatooine",
};

test("renders character card with correct info", () => {
  render(<CharacterCard character={mockCharacter} onClick={() => {}} />);

  // Check if character name is displayed
  expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();

  // Optional: simulate click
  const card = screen.getByText("Luke Skywalker");
  fireEvent.click(card);
});
