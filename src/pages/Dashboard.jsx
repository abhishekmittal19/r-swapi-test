import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Welcome to Star Wars Explorer</h1>
        <p className="text-gray-300">Browse characters, favorite them, and inspect homeworld details.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/characters" className="glass p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Explore Characters</h3>
          <p className="text-sm text-gray-300 mt-2">List with filters, search and modals.</p>
        </Link>
        <Link to="/favorites" className="glass p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">My Favorites</h3>
          <p className="text-sm text-gray-300 mt-2">Saved locally in your browser.</p>
        </Link>
        <div className="glass p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="text-sm text-gray-300 mt-2">Built with React, Tailwind CSS, SWAPI. Demo-ready.</p>
        </div>
      </div>
    </div>
  );
}
