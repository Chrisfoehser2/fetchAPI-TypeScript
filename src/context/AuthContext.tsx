import { useState, createContext, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

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

  const [selectedDogs, setSelectedDogs] = useState([]);
  const navigate = useNavigate();

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
