import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, authError } = useAuth();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    const ok = login({ username: user, password: pass, acceptAny: true });
    if (ok) navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass p-8 rounded-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Star Wars Explorer</h2>
        <p className="text-sm text-gray-300 mb-4">Login (for demo any credentials work)</p>
        <form onSubmit={handle} className="space-y-3">
          <input value={user} onChange={(e)=>setUser(e.target.value)} placeholder="Username" className="w-full p-3 rounded bg-white/5" />
          <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="Password" className="w-full p-3 rounded bg-white/5" />
          {authError && <div className="text-red-400">{authError}</div>}
          <button className="w-full py-3 bg-yellow-500 rounded font-semibold">Login</button>
        </form>
      </div>
    </div>
  );
}
