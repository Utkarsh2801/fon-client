import React, { useState, createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({children, ...rest}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (email, password) => {
    setIsLoggedIn(true);
  }

  const logout = () => {
    setIsLoggedIn(false);
  }

  const value = {
    isLoggedIn,
    login,
    ...rest
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;