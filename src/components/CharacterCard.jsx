import React, { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";

const colorMap = {
  human: "from-yellow-400 to-yellow-600",
  droid: "from-gray-400 to-gray-600",
  wookiee: "from-amber-500 to-amber-700",
};

export default function CharacterCard({ character, onClick }) {
  const [speciesName, setSpeciesName] = useState("");
  const { toggle, favorites } = useFavorites();

  useEffect(() => {
    async function loadSpecies() {
      if (!character.species || character.species.length === 0) {
        setSpeciesName("Human");
        return;
      }
      try {
        const r = await fetch(character.species[0]);
        const d = await r.json();
        setSpeciesName(d.name);
      } catch {
        setSpeciesName("Unknown");
      }
    }
    loadSpecies();
  }, [character]);

  const accent =
    colorMap[speciesName?.toLowerCase()] || "from-indigo-500 to-indigo-700";

  // ✅ use numeric ID or name for stable seed
  const idMatch = character.url.match(/people\/(\d+)\//);
  const seed = idMatch ? idMatch[1] : character.name.replace(/\s+/g, "-");
  const img = `https://picsum.photos/seed/${seed}/400/260`;

  const isFav = favorites.some((f) => f.url === character.url);

  return (
    <div
      className="glass rounded-2xl overflow-hidden shadow-lg cursor-pointer transform hover:-translate-y-2 transition"
    >
      <div onClick={onClick}>
        <div className={`bg-gradient-to-r ${accent} h-40 w-full overflow-hidden`}>
          <img
            src={img}
            alt={character.name}
            className="w-full h-40 object-cover opacity-90"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{character.name}</h3>
          <p className="text-sm text-gray-300 mt-1">
            Birth Year: {character.birth_year}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            Species: {speciesName || "—"}
          </p>
        </div>
      </div>
      <div className="p-3 flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggle(character);
          }}
          className={`px-3 py-1 rounded ${
            isFav ? "bg-yellow-400 text-black" : "bg-white/5 text-white"
          }`}
        >
          {isFav ? "★ Fav" : "☆ Fav"}
        </button>
      </div>
    </div>
  );
}
