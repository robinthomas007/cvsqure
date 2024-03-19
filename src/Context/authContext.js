import React, { createContext, useState, useContext } from 'react';
import { jwtDecode } from "jwt-decode";

import { getCookie } from './../Lib/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const token = getCookie('token');
  console.log(token, "tokentoken")
  let LoggedInUser = token ? jwtDecode(token) : {};
  const [user, setUser] = useState(LoggedInUser || {});

  const login = (user) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
