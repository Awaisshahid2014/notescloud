import React, { useContext, useState } from "react";
import AuthContext from "./authContext";

export const AuthState = (props) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("auth-token")
  );
  const login = (token) => {
    localStorage.setItem("auth-token", token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    setAuthToken(null);
  };

  const value = {
    authToken,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
