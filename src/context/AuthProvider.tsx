import React, { useState } from 'react';

interface AuthState {
  [key: string]: any;
}

interface AuthContextValue {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

export const AuthContext = React.createContext<AuthContextValue>({
  auth: {
    accessToken: "",
  },
  setAuth: () => { },
});

type AuthContextProviderProps = {
  children: React.ReactNode
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}