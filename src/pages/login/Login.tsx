import "./login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { authLogin } from "../../data/dataAuthUsage";

export default function Login() {
  const { loggedIn, setLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState({ email: "", userName: "" });

  const validateFields = () => {
    const err = { userName: "", email: "" };
    if (!userName) err.userName = "UserName is required";
    if (!email) {
      err.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.email = "Email is invalid";
    }
    setErrors(err);
  };

  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    validateFields();
    e.preventDefault();
    authLogin(userName, email)
      .then((response) => {
        if (response?.ok) {
          setLoggedIn(true);
          navigate("/home");
        }
      })
      .catch(() => {
        console.log(errors);
      });
  };

  return (
    <div className="login-wraper">
      <h1 className="legend-text">Login To Fetch Your Friend </h1>

      <form onSubmit={handleSubmit}>
        <h3> Name</h3>

        <input
          placeholder="Full Name..."
          value={userName}
          type="userName"
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <br />

        <h3>Email</h3>

        <input
          placeholder="Email..."
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />

        <button type="submit"> Login</button>
      </form>

      <div className="text-wrapper">
        <p className="p-1">"The place to come for your furry friend!"</p>

        <p className="p-tags">
          With 100's of puppers in need of a new family and forever home.{" "}
        </p>

        <p className="p-tags">
          Login with your <b>name</b> and <b>email</b> today to start fetching!
          Once logged in you'll be able to search through all your favorite
          breeds and match with your forever friend.{" "}
        </p>
      </div>
    </div>
  );
}
