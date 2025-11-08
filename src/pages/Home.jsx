import React, { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import CharacterModal from "../components/CharacterModal";
import SearchFilterBar from "../components/SearchFilterBar";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCharacters = async (url = "https://swapi.dev/api/people/") => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setCharacters(data.results);
      setFilteredCharacters(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setError(null);
    } catch (err) {
      setError("Failed to fetch Star Wars characters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  // 🔍 Search handler
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCharacters(characters);
    } else {
      const filtered = characters.filter((char) =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCharacters(filtered);
    }
  }, [searchTerm, characters]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">
        ⭐ Star Wars Characters
      </h1>

      <SearchFilterBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading && <p className="text-center text-gray-400 mt-6">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-6">{error}</p>}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filteredCharacters.map((char, index) => (
          <CharacterCard
            key={index}
            character={char}
            onClick={() => setSelectedCharacter(char)}
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          disabled={!prevPage}
          onClick={() => fetchCharacters(prevPage)}
          className={`px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 ${
            !prevPage && "opacity-50 cursor-not-allowed"
          }`}
        >
          ← Previous
        </button>
        <button
          disabled={!nextPage}
          onClick={() => fetchCharacters(nextPage)}
          className={`px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 ${
            !nextPage && "opacity-50 cursor-not-allowed"
          }`}
        >
          Next →
        </button>
      </div>

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
};

export default Home;
