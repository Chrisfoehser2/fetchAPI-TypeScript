import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuthContext } from "../context/AuthContext";

type ProtectedRouteType = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteType) => {
  const { loggedIn } = useAuthContext();
  if (!loggedIn) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
