import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/auth/login", {
        email,
        password,
      });

      // cookie set → user logged in
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">

      <div className="card shadow-lg p-4 rounded-4" style={{ width: "380px" }}>
        
        {/* TITLE */}
        <h3 className="text-center mb-3 fw-bold">Welcome Back</h3>
        <p className="text-center text-muted mb-4">
          Login to continue 🚀
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <input
            type="email"
            className="form-control mb-3 rounded-3"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            className="form-control mb-3 rounded-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* BUTTON */}
          <button className="btn btn-primary w-100 rounded-3 py-2 fw-semibold">
            Login
          </button>
        </form>

        {/* FOOTER */}
        <div className="text-center mt-3">
          <small>
            Don't have an account?{" "}
            <span
              className="text-primary fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </small>
        </div>

      </div>
    </div>
  );
}

export default Login;