/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from 'react';
import { AuthContextValueType, AuthContextFunctionType } from '@src/types/auth';

type AuthProviderProps = {
  children: React.ReactNode;
};

const initialAuthContextValue = {
  isAuthenticated: false,
  isVerifying: true,
};

export const AuthContext = createContext<
  AuthContextValueType & AuthContextFunctionType
>({
  ...initialAuthContextValue,
  setIsAuthenticated: () => {},
  setIsVerifying: () => {},
});

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialAuthContextValue.isAuthenticated
  );
  const [isVerifying, setIsVerifying] = useState(
    initialAuthContextValue.isVerifying
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isVerifying,
        setIsVerifying,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
