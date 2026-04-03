import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

function Navbar() {
  const navigate = useNavigate();
const[show ,setShow]=useState(false);
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
     <div style={{ position: "relative", display: "inline-block" }}  onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {/* Avatar / toggle button */}
      <button
        className="btn btn-secondary  rounded-circle"
        style={{ width: "50px", height: "50px" , background: "#2dba87", boxShadow: "0 4px 10px rgba(0,0,0,0.2)", }}
        onClick={() => setShow(!show)}
      >
        👤
      </button>

      {/* Toggle buttons */}
      {show && (
        <div
          className="d-flex flex-column position-absolute"
          style={{ top: "60px", right: 0, gap: "5px",zIndex: 1000 }}
        >
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/register");
              setShow(false);
            }}
          >
            Register
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/login");
              setShow(false);
            }}
          >
            Login
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              handleLogout();
              setShow(false);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
    </nav>
  );
}

export default Navbar;