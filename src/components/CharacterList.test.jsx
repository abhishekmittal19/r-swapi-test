// src/components/CharacterList.test.jsx
import { render, screen } from "@testing-library/react";
import CharacterList from "./CharacterList";

// Mock data
const mockCharacters = [
  { name: "Luke Skywalker", species: ["Human"], homeworld: "Tatooine" },
  { name: "Darth Vader", species: ["Human"], homeworld: "Tatooine" },
];

const mockFavorites = [];

test("renders a list of character cards", () => {
  render(
    <CharacterList
      characters={mockCharacters}
      favorites={mockFavorites} // Pass empty array to avoid 'includes' error
      toggleFavorite={() => {}}
      onSelect={() => {}}
    />
  );

  expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  expect(screen.getByText("Darth Vader")).toBeInTheDocument();
});
