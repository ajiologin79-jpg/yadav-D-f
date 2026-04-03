import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api/api";

export default function Signup({ setPage }) {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const signup = async () => {

    // 🔥 validation
    if (!userName || !email) {
      alert("Fill all fields ❗");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/user/add`, {
        userName,
        email
      });

      alert("Signup successful ✅");
      setPage("login");

    } catch (err) {
      console.error(err);
      alert("Signup failed ❌");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Create Account</h2>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <button className="btn blue" onClick={signup}>
          Signup
        </button>

        <p onClick={() => setPage("login")} className="link">
          Already have account? Login
        </p>

      </div>

    </div>
  );
}
