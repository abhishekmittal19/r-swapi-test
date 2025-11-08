import React, { createContext, useContext, useEffect, useState } from "react";
import { getToken, saveToken, removeToken, refreshIfNeeded } from "../auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => (getToken() ? { name: "Demo User" } : null));
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const iv = setInterval(() => {
      const t = refreshIfNeeded();
      if (t) console.log("Token refreshed (mock)");
    }, 10_000);
    return () => clearInterval(iv);
  }, []);

  const login = ({ username, password, acceptAny = true }) => {
    // if acceptAny true, accept any credentials; else check hardcoded admin/1234
    if (!acceptAny && !(username === "admin" && password === "1234")) {
      setAuthError("Invalid credentials");
      return false;
    }
    saveToken("fake-jwt-" + Date.now());
    setUser({ name: username || "Demo User" });
    setAuthError(null);
    return true;
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
