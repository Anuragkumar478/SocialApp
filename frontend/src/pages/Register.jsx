import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/auth/register", {
        name,
        email,
        password,
      });

      // cookie already set → user logged in
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "380px" }}>
        
        <h3 className="text-center mb-3 fw-bold">Create Account</h3>
        <p className="text-center text-muted mb-4">
          Join SocialApp 🚀
        </p>

        <form onSubmit={handleSubmit}>
          
          <input
            className="form-control mb-3 rounded-3"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="form-control mb-3 rounded-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="form-control mb-3 rounded-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100 rounded-3">
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </small>
        </div>

      </div>
    </div>
  );
}

export default Register;