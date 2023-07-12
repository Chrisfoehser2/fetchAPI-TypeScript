import "./navBar.css";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { authLogOut } from "../../data/dataAuthUsage";

export default function NavBar() {
  const { loggedIn, setLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  function logOut() {
    authLogOut();
    setLoggedIn(false);
    navigate("/");
  }

  return (
    <div className="nav-bar">
      <h1>Fetch Your Friend</h1>

      <div className="name-login-logout">
        {loggedIn && (
          <>
            <h3 className="log-out" onClick={logOut}>
              Logout
            </h3>
          </>
        )}
      </div>
    </div>
  );
}
