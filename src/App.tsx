import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Layout from "./componets/Layout";
import Home from "./pages/home/Home";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./componets/ProtectedRoute";
import DogMatch from "./pages/DogMatch";
import Error from "./pages/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <AuthProvider>
          <Layout />
        </AuthProvider>
      }
    >
      <Route index element={<Login />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dog-match"
        element={
          <ProtectedRoute>
            <DogMatch />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Error />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
