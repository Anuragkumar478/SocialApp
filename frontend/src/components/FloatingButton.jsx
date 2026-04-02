// FloatingButton.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FloatingButton() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      {hover && (
        <span
          style={{
            position: "absolute",
            right: "60px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#000",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "6px",
            fontSize: "12px",
          }}
        >
          Create Post
        </span>
      )}

      <button
        onClick={() => navigate("/create")}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #22c55e, #4ade80)",
          color: "white",
          border: "none",
          fontSize: "26px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        +
      </button>
    </div>
  );
}

export default FloatingButton;