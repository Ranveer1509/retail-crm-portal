import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

function readStoredUser() {
  const raw = localStorage.getItem("retail_crm_user");
  return raw ? JSON.parse(raw) : null;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("retail_crm_token"));
  const [user, setUser] = useState(readStoredUser);

  const saveSession = useCallback((authResponse) => {
    localStorage.setItem("retail_crm_token", authResponse.token);
    localStorage.setItem("retail_crm_user", JSON.stringify(authResponse));
    setToken(authResponse.token);
    setUser(authResponse);
  }, []);

  const saveOAuthToken = useCallback((jwtToken) => {
    const authResponse = { token: jwtToken, email: "Google user", username: "Google user", provider: "GOOGLE" };
    localStorage.setItem("retail_crm_token", jwtToken);
    localStorage.setItem("retail_crm_user", JSON.stringify(authResponse));
    setToken(jwtToken);
    setUser(authResponse);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("retail_crm_token");
    localStorage.removeItem("retail_crm_user");
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    token,
    user,
    isAuthenticated: Boolean(token),
    saveSession,
    saveOAuthToken,
    logout
  }), [token, user, saveSession, saveOAuthToken, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
