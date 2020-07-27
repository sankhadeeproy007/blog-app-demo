import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
