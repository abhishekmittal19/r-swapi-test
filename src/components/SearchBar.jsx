import React from "react";

export default function SearchBar({ q, setQ, onSubmit }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="flex justify-center gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search characters (partial match)..."
        className="w-full max-w-lg px-4 py-2 rounded-l-lg bg-white/5 focus:outline-none"
      />
      <button type="submit" className="px-4 py-2 bg-yellow-500 rounded-r-lg">Search</button>
    </form>
  );
}
