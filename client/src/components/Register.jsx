import { useState } from "react";
import API from "../api";
import "../style/register.css";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <div className="register_card">
        <h2>Register</h2>
        <form>
          <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="address" onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button onClick={handleRegister}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
