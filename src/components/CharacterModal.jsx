import React, { useEffect, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function CharacterModal({ character, onClose }) {
  const [homeworld, setHomeworld] = useState(null);
  const [films, setFilms] = useState([]);
  useEffect(() => {
    if (!character) return;
    let cancelled = false;
    const load = async () => {
      try {
        if (character.homeworld) {
          const r = await fetch(character.homeworld);
          if (!cancelled) setHomeworld(await r.json());
        }
        const filmArr = await Promise.all(character.films.map(async (f) => {
          const r = await fetch(f); return r.json();
        }));
        if (!cancelled) setFilms(filmArr);
      } catch (e) { /* ignore */ }
    };
    load();
    return () => { cancelled = true; };
  }, [character]);

  if (!character) return null;
  const heightM = (Number(character.height) / 100).toFixed(2);
  const created = new Date(character.created);
  const dateAdded = created.toLocaleDateString("en-GB");

  return (
    <Modal isOpen={!!character} onRequestClose={onClose} overlayClassName="fixed inset-0 bg-black/60 flex items-start justify-center p-4" className="bg-white/5 glass p-6 rounded-2xl max-w-3xl w-full mt-12">
      <div className="flex gap-4">
        <div className="w-40 flex-shrink-0">
          <img src={`https://picsum.photos/seed/modal${encodeURIComponent(character.url)}/300/400`} alt={character.name} className="rounded-lg object-cover w-full h-full" />
        </div>
        <div className="flex-1 text-white">
          <h2 className="text-2xl font-bold">{character.name}</h2>
          <div className="mt-3 text-sm">
            <p><strong>Height:</strong> {isNaN(Number(character.height)) ? "—" : `${heightM} m`}</p>
            <p><strong>Mass:</strong> {character.mass} kg</p>
            <p><strong>Birth Year:</strong> {character.birth_year}</p>
            <p><strong>Date added:</strong> {dateAdded}</p>
            <p><strong>Number of films:</strong> {character.films.length}</p>
          </div>

          {homeworld && (
            <div className="mt-4 bg-white/5 p-3 rounded">
              <h4 className="font-semibold">Homeworld</h4>
              <p><strong>Name:</strong> {homeworld.name}</p>
              <p><strong>Terrain:</strong> {homeworld.terrain}</p>
              <p><strong>Climate:</strong> {homeworld.climate}</p>
              <p><strong>Population:</strong> {homeworld.population}</p>
            </div>
          )}

          <div className="mt-4">
            <h4 className="font-semibold">Films</h4>
            <ul className="list-disc list-inside max-h-32 overflow-auto text-sm mt-2">
              {films.length ? films.map(f => <li key={f.url}>{f.title}</li>) : <li>Loading...</li>}
            </ul>
          </div>

          <div className="mt-6">
            <button onClick={onClose} className="px-4 py-2 bg-red-500 rounded text-white">Close</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
