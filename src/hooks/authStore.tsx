import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Role = "estudiante" | "funcionario" | "externo";
export type User = { email: string; role: Role } | null;

type AuthCtx = {
  user: User;
  login: (email: string, role: Role) => void;   
  logout: () => void;                    
};

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    else localStorage.removeItem("auth_user");
  }, [user]);

  const login = (email: string, role: Role) => setUser({ email, role });
  const logout = () => setUser(null);

  const value = useMemo<AuthCtx>(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}

