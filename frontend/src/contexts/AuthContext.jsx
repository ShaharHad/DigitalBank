// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");
    if (storedUser){
        setUser(JSON.parse(storedUser));
    } 
    if (storedToken){
        setToken(JSON.parse(storedToken));
    } 
  }, []);

  const setUserInSessionStorage = (userData, token) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", JSON.stringify(token));
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, setUserInSessionStorage, logout, isAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
