import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api/api";
import { loginUser } from "../utils/auth";

export default function Login({ setPage }) {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {

    if (!email) {
      alert("Enter email ❗");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/user/${encodeURIComponent(email)}`
      );

      if (!res.data) {
        alert("User not found ❌");
        return;
      }

      loginUser(res.data);

      alert("Login successful ✅");
      setPage("dashboard");

    } catch (err) {
      console.error(err);

      if (err.response?.status === 404) {
        alert("User not found ❌");
      } else {
        alert("Server error ❌");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"   // ✅ improved
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <button
          className="btn blue"
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p onClick={() => setPage("signup")} className="link">
          Create Account
        </p>

      </div>

    </div>
  );
}
