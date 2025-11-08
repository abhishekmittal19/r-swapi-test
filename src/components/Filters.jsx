import React from "react";

export default function Filters({ speciesOptions, homeOptions, filmOptions, filters, setFilters, onClear }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-3">
      <select value={filters.species} onChange={(e) => setFilters({...filters, species: e.target.value})} className="px-3 py-2 rounded bg-white/5">
        <option value="">All species</option>
        {speciesOptions.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <select value={filters.homeworld} onChange={(e) => setFilters({...filters, homeworld: e.target.value})} className="px-3 py-2 rounded bg-white/5">
        <option value="">All homeworlds</option>
        {homeOptions.map(h => <option key={h} value={h}>{h}</option>)}
      </select>

      <select value={filters.film} onChange={(e) => setFilters({...filters, film: e.target.value})} className="px-3 py-2 rounded bg-white/5">
        <option value="">All films</option>
        {filmOptions.map(f => <option key={f.url} value={f.url}>{f.title}</option>)}
      </select>

      <button onClick={onClear} className="px-3 py-2 bg-white/5 rounded">Clear</button>
    </div>
  );
}
