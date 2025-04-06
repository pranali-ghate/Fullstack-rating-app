import { useState } from "react";
import API from "../api";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      if (data.role === "admin") nav("/admin");
      else if (data.role === "user") nav("/user");
      else if (data.role === "store_owner") nav("/store");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <div className="login_card">
        <h2>Login</h2>
        <form>
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br />
          <button onClick={handleLogin}>Login</button>
        </form>

        <div className="signup-link">
          Don't have an account? <NavLink to="/register">Register</NavLink>
        </div>

      </div>
    </div>
  );
};

export default Login;
