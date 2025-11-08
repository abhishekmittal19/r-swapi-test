const BASE_URL = "https://swapi.dev/api";

export const fetchCharacters = async (page = 1, search = "") => {
  try {
    const res = await fetch(`${BASE_URL}/people/?page=${page}&search=${search}`);
    if (!res.ok) throw new Error("Failed to fetch characters");
    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const fetchHomeworld = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch homeworld");
    return await res.json();
  } catch (error) {
    throw error;
  }
};
