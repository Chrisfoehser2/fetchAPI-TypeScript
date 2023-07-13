import { useState, createContext, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// @ts-expect-error -- TODO: Cannot find name 'ContextProps'.
const AuthContext = createContext({} as ContextProps);

export function useAuthContext() {
  return useContext(AuthContext);
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const [selectedDogs, setSelectedDogs] = useState<string[]>([]);
  const navigate = useNavigate();

  // @ts-expect-error -- TODO: Parameter 'data' implicitly has an 'any' type.
  function setDogMatch(data) {
    setSelectedDogs(data);
    navigate("/dog-match");
  }

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        selectedDogs,
        setDogMatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
