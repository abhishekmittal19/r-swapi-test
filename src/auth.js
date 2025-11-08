// lightweight auth utils (used by AuthContext)
const TOKEN_KEY = "sw_token";
const REFRESH_KEY = "sw_token_expiry";

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_KEY, (Date.now() + 60_000).toString()); // 60s validity
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const refreshIfNeeded = () => {
  const token = getToken();
  if (!token) return null;
  const expiry = Number(localStorage.getItem(REFRESH_KEY) || 0);
  const now = Date.now();
  if (expiry - now < 30_000) { // refresh if less than 30s left
    const newToken = "fake-jwt-" + Date.now();
    saveToken(newToken);
    return newToken;
  }
  return token;
};
