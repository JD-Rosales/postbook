// Unused file, will delete soon
import { createContext, useContext } from 'react';

export type UserType = {
  id: string;
  email: string;
};

export type AuthContextType = {
  user: UserType;
  setUser: (user: UserType) => void;
};

export const userInitialState = {
  id: '',
  email: '',
};

export const AuthContext = createContext<AuthContextType>({
  user: userInitialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
});

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
