import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function CreatePost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("text", text);
      if (image) {
        formData.append("image", image);
      }

      await API.post("/api/posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/"); // go back to feed
    } catch (err) {
      alert(err.response?.data?.message || "Error creating post");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-4">

      <div className="card shadow p-4 rounded-4" style={{ width: "500px" }}>
        
        <h4 className="mb-3 fw-bold">Create Post</h4>

        <form onSubmit={handleSubmit}>

          {/* TEXT */}
          <textarea
            className="form-control mb-3"
            rows="3"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* IMAGE */}
          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* BUTTON */}
          <button className="btn btn-primary w-100">
            Post
          </button>

        </form>

      </div>
    </div>
  );
}

export default CreatePost;