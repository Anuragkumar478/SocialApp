import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function CreatePost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // preview the selected image
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("text", text);
      if (image) formData.append("image", image);

      await API.post("/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/"); // go back to feed
    } catch (err) {
      alert(err.response?.data?.message || "Error creating post");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        padding: "20px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="card p-4 rounded-4 shadow"
        style={{
          width: "500px",
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          color: "#fff",
        }}
      >
        <h4 className="mb-4 fw-bold" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
          Create Post
        </h4>

        <form onSubmit={handleSubmit}>

          {/* IMAGE PREVIEW */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="img-fluid rounded mb-3"
              style={{
                maxHeight: "300px",
                objectFit: "cover",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            />
          )}

          {/* IMAGE INPUT */}
          <input
            type="file"
            className="form-control mb-3"
            onChange={handleImageChange}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
              color: "#fff",
              padding: "6px 10px",
              fontSize: "0.9rem",
            }}
          />

          {/* TEXT */}
          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
              color: "#fff",
              padding: "10px",
              fontSize: "0.95rem",
            }}
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="btn w-100"
            style={{
              background: "linear-gradient(90deg, #36d1dc, #5b86e5)",
              color: "#fff",
              border: "none",
              borderRadius: "25px",
              padding: "10px 0",
              fontWeight: "500",
              fontSize: "1rem",
              transition: "0.3s",
            }}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;