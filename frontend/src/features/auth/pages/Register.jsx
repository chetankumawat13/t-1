import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerApi } from "../services/auth.api";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      showToast("Please fill all fields", "error");
      return;
    }

    try {
      setLoading(true);

      await registerApi({
        username: name,
        email,
        password,
      });

     

      showToast("Account Created 🎉", "success");

      setTimeout(() => {
        navigate("/"); 
      }, 1200);

    } catch (err) {
      const message =
        err.response?.data?.message || "User already exists";

      showToast(message, "error");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      {toast && (
        <div className={`toast toast--${toast.type}`}>
          {toast.message}
        </div>
      )}

      <div className="auth__box">
        <h1 className="auth__logo">AI-MIND</h1>
        <h2 className="auth__title">Register</h2>

        <form className="auth__form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="auth__switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;