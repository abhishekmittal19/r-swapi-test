import React, { useEffect, useState } from "react";

export default function CharacterModal({ character, onClose }) {
  const [homeworld, setHomeworld] = useState(null);

  useEffect(() => {
    const fetchHomeworld = async () => {
      try {
        const res = await fetch(character.homeworld);
        const data = await res.json();
        setHomeworld(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHomeworld();
  }, [character]);

  const formattedDate = new Date(character.created).toLocaleDateString("en-GB");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 dark:bg-white dark:text-black rounded-xl p-6 max-w-md w-full relative">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-white dark:hover:text-black text-xl"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-yellow-400 dark:text-yellow-600 text-center">
          {character.name}
        </h2>

        <p><strong>Height:</strong> {character.height / 100} m</p>
        <p><strong>Mass:</strong> {character.mass} kg</p>
        <p><strong>Birth Year:</strong> {character.birth_year}</p>
        <p><strong>Date Added:</strong> {formattedDate}</p>
        <p><strong>Films Appeared:</strong> {character.films.length}</p>

        {homeworld && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-yellow-300 dark:text-yellow-600">🌍 Homeworld</h3>
            <p><strong>Name:</strong> {homeworld.name}</p>
            <p><strong>Terrain:</strong> {homeworld.terrain}</p>
            <p><strong>Climate:</strong> {homeworld.climate}</p>
            <p><strong>Population:</strong> {homeworld.population}</p>
          </div>
        )}
      </div>
    </div>
  );
}
