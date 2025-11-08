import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("sw_favs") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("sw_favs", JSON.stringify(favorites));
  }, [favorites]);

  const add = (char) => {
    if (!favorites.find((f) => f.url === char.url)) setFavorites([...favorites, char]);
  };
  const remove = (url) => setFavorites(favorites.filter((f) => f.url !== url));
  const toggle = (char) => (favorites.find((f) => f.url === char.url) ? remove(char.url) : add(char));

  return (
    <FavoritesContext.Provider value={{ favorites, add, remove, toggle }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
