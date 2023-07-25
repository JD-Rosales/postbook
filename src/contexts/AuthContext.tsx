/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from 'react';
import { AuthContextValueType } from '@src/types/auth';

type AuthProviderProps = {
  children: React.ReactNode;
};

const initialAuthContext = {
  token: '',
  isAuthenticated: false,
  isVerifying: false,
};

type AuthContextType = {
  authContextValue: AuthContextValueType;
  setAuthContextValue: React.Dispatch<
    React.SetStateAction<AuthContextValueType>
  >;
};

export const AuthContext = createContext<AuthContextType>({
  authContextValue: { ...initialAuthContext },
  setAuthContextValue: () => {},
});

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [authContextValue, setAuthContextValue] = useState(initialAuthContext);

  return (
    <AuthContext.Provider
      value={{
        authContextValue,
        setAuthContextValue,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
