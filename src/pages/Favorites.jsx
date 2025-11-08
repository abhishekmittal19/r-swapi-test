import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import CharacterCard from "../components/CharacterCard";

export default function Favorites() {
  const { favorites } = useFavorites();
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
      {favorites.length === 0 ? <div className="text-gray-300">No favorites yet.</div> :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map(c => <CharacterCard key={c.url} character={c} onClick={()=>{}} />)}
        </div>
      }
    </div>
  );
}
