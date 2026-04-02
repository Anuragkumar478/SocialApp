import { useNavigate } from "react-router-dom";
import API from "../api/axios";
function Navbar() {
  const navigate = useNavigate();
    const handleLogout = async () => {
    try {
      await API.post("/api/auth/logout");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar  px-4 py-2  border-bottom d-flex justify-content-between align-items-center" style={ { background: "linear-gradient(90deg, #29293d, #766c8d, #63585e)" } } >

      {/* LOGO */}
     <span
  className="navbar-brand fw-bold fs-4"
  style={{
    cursor: "pointer",
    background: "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "1px"
  }}
  onClick={() => navigate("/")}
>
  SocialApp
</span>

     <button
  onClick={() => navigate("/create")}
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    background: "#fd0d15",
    color: "white",
    border: "none",
    fontSize: "24px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    zIndex: 1000
  }}
>
  +
</button>
      <div>
        <button
          className="btn btn-primary rounded-pill px-3"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
        <button
          className="btn btn-primary rounded-pill px-4 ms-2"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
          <button
            className="btn btn-danger rounded-pill px-3"
            onClick={handleLogout}
          >
            Logout
          </button>
      </div>

    </nav>
  );
}

export default Navbar;