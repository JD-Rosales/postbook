type AuthContextValueType = {
  isAuthenticated: boolean;
  isVerifying: boolean;
};

interface AuthContextFunctionType {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVerifying: React.Dispatch<React.SetStateAction<boolean>>;
}
