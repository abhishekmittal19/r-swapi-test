import CharacterCard from "./CharacterCard";

export default function CharacterList({ characters, favorites, toggleFavorite }) {
  if (characters.length === 0) return <p className="text-center mt-6">No characters found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {characters.map(char => (
        <CharacterCard
          key={char.name}
          character={char}
          isFavorite={favorites.includes(char.name)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}
