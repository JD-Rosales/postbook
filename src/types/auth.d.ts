export type AuthContextValueType = {
  isAuthenticated: boolean;
  isVerifying: boolean;
};

export interface AuthContextFunctionType {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVerifying: React.Dispatch<React.SetStateAction<boolean>>;
}
