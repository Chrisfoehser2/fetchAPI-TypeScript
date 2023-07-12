import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

// @ts-expect-error -- TODO: Binding element 'children' implicitly has an 'any' type.
export const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useAuthContext();
  if (!loggedIn) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
