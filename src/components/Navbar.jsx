import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <header className="p-4 flex items-center justify-between glass">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-xl">🌌 Star Wars Explorer</Link>
        {user && <Link to="/characters" className="text-sm text-gray-200">Characters</Link>}
        {user && <Link to="/favorites" className="text-sm text-gray-200">Favorites</Link>}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user ? (
          <>
            <span className="text-sm hidden sm:inline">Hello, {user.name}</span>
            <button
              onClick={() => { logout(); nav("/login"); }}
              className="px-3 py-1 bg-red-500 rounded text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="px-3 py-1 bg-yellow-500 rounded text-black">Login</Link>
        )}
      </div>
    </header>
  );
}
