//Added By Rafael Maghinay October 2025

import React, { createContext, useContext, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider wraps your app and provides auth state
export const AuthProvider = ({ children }) => {
  // Check localStorage for persisted login state
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  // Login function (call this after successful login)
  const login = () => {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", "true");
  };

  // Logout function
  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
  };

  // Provide the state and functions to children
  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
