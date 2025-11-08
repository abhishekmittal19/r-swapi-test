import React, { useEffect, useMemo, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import CharacterModal from "../components/CharacterModal";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import Loader from "../components/Loader";

export default function Characters() {
  const [pageUrl, setPageUrl] = useState("https://swapi.py4e.com/api/people/"); // ✅ Fixed working API
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [raw, setRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  // Search & Filters
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState({ species: "", homeworld: "", film: "" });

  // Caches for API lookups
  const [homeCache, setHomeCache] = useState({});
  const [speciesCache, setSpeciesCache] = useState({});
  const [filmCache, setFilmCache] = useState({});

  useEffect(() => {
    let cancelled = false;
    async function load(url) {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch Star Wars data");
        const data = await res.json();
        if (cancelled) return;
        setRaw(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);

        // Prefetch related data
        const hw = new Set();
        const sp = new Set();
        const fm = new Set();

        data.results.forEach((r) => {
          if (r.homeworld) hw.add(r.homeworld);
          r.species.forEach((s) => s && sp.add(s));
          r.films.forEach((f) => fm.add(f));
        });

        // Fetch Homeworlds
        await Promise.all(
          Array.from(hw).map(async (u) => {
            if (!homeCache[u]) {
              try {
                const r = await fetch(u);
                const d = await r.json();
                setHomeCache((prev) => ({ ...prev, [u]: d }));
              } catch {
                /* ignore */
              }
            }
          })
        );

        // Fetch Species
        await Promise.all(
          Array.from(sp).map(async (u) => {
            if (!speciesCache[u]) {
              try {
                const r = await fetch(u);
                const d = await r.json();
                setSpeciesCache((prev) => ({ ...prev, [u]: d.name }));
              } catch {
                setSpeciesCache((prev) => ({ ...prev, [u]: "Unknown" }));
              }
            }
          })
        );

        // Fetch Films
        await Promise.all(
          Array.from(fm).map(async (u) => {
            if (!filmCache[u]) {
              try {
                const r = await fetch(u);
                const d = await r.json();
                setFilmCache((prev) => ({
                  ...prev,
                  [u]: { title: d.title, url: u },
                }));
              } catch {
                /* ignore */
              }
            }
          })
        );
      } catch (e) {
        setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load(pageUrl);
    return () => {
      cancelled = true;
    };
  }, [pageUrl]); // eslint-disable-line

  // Compute Filter Options
  const speciesOptions = useMemo(() => {
    const vals = Object.values(speciesCache).filter(Boolean);
    return Array.from(new Set(vals)).sort();
  }, [speciesCache]);

  const homeOptions = useMemo(() => {
    const vals = Object.values(homeCache)
      .map((h) => h.name)
      .filter(Boolean);
    return Array.from(new Set(vals)).sort();
  }, [homeCache]);

  const filmOptions = useMemo(() => {
    return Object.values(filmCache).sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }, [filmCache]);

  // Combine filters & search
  const visible = useMemo(() => {
    let data = raw.slice();
    if (q.trim()) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(q.toLowerCase())
      );
    }
    if (filters.species) {
      data = data.filter((c) =>
        c.species.some((s) => speciesCache[s] === filters.species)
      );
    }
    if (filters.homeworld) {
      data = data.filter(
        (c) => (homeCache[c.homeworld]?.name || "") === filters.homeworld
      );
    }
    if (filters.film) {
      data = data.filter((c) => c.films.includes(filters.film));
    }
    return data;
  }, [raw, q, filters, speciesCache, homeCache]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-yellow-400">Explore Star Wars Characters</h2>
        <p className="text-sm text-gray-400">
          Search, filter, and click a card to view details
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mb-4">
        <SearchBar q={q} setQ={setQ} />
        <Filters
          speciesOptions={speciesOptions}
          homeOptions={homeOptions}
          filmOptions={filmOptions}
          filters={filters}
          setFilters={setFilters}
          onClear={() => {
            setFilters({ species: "", homeworld: "", film: "" });
            setQ("");
          }}
        />
      </div>

      {/* Results */}
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-400 text-center">{error}</div>
      ) : (
        <>
          {visible.length === 0 ? (
            <div className="text-center text-gray-300 py-12">
              No characters found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visible.map((c) => (
                <CharacterCard
                  key={c.url}
                  character={c}
                  onClick={() => setSelected(c)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              disabled={!prevUrl}
              onClick={() => setPageUrl(prevUrl)}
              className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-600"
            >
              ← Prev
            </button>
            <button
              disabled={!nextUrl}
              onClick={() => setPageUrl(nextUrl)}
              className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-600"
            >
              Next →
            </button>
          </div>
        </>
      )}

      {/* Character Modal */}
      {selected && (
        <CharacterModal character={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
