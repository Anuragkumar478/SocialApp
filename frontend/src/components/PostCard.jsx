import { useState } from "react";
import API from "../api/axios";
import logo from "../assets/image.png";

function PostCard({ post, refresh }) {
  const [comment, setComment] = useState("");

  // 👍 LIKE
  const handleLike = async () => {
    await API.put(`/api/posts/${post._id}/like`);
    refresh();
  };

  // 💬 COMMENT
  const handleComment = async () => {
    if (!comment.trim()) return;

    await API.post(`/api/posts/${post._id}/comment`, {
      text: comment,
    });

    setComment("");
    refresh();
  };

  return (
    <div
      className="card mb-4 rounded-4"
      style={{
        backdropFilter: "blur(15px)",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        color: "#fff",
        padding: "12px",
      }}
    >
      {/* IMAGE FIRST */}
      {post.image && (
        <img
          src={post.image}
          className="img-fluid rounded mb-3"
          style={{
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        />
      )}

      {/* USER INFO */}
      <div className="d-flex align-items-center mb-2">
        <img
          src={logo}
          className="rounded-circle"
          style={{
            width: "42px",
            height: "42px",
            marginRight: "10px",
            border: "2px solid #fff",
          }}
        />
        <div>
          <strong style={{ fontSize: "0.95rem" }}>{post.user?.name}</strong>
          <br />
          <small style={{ color: "#ccc", fontSize: "0.75rem" }}>
            {new Date(post.createdAt).toLocaleString()}
          </small>
        </div>
      </div>

      {/* TEXT BELOW IMAGE */}
      {post.text && (
        <p style={{ color: "#f0f0f0", fontSize: "0.95rem", lineHeight: "1.5" }}>
          {post.text}
        </p>
      )}

      {/* ACTIONS */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <button
          onClick={handleLike}
          className="btn"
          style={{
            background: "linear-gradient(90deg, #ff6a00, #ee0979)",
            color: "#fff",
            border: "none",
            padding: "6px 14px",
            borderRadius: "20px",
            fontWeight: "500",
          }}
        >
          ❤️ {post.likes.length}
        </button>

        <span style={{ color: "#ccc", fontSize: "0.9rem" }}>
          💬 {post.comments.length}
        </span>
      </div>

      {/* COMMENT BOX */}
      <div className="mt-2">
        <input
          className="form-control"
          placeholder="Add comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            borderRadius: "12px",
          }}
        />

        <button
          onClick={handleComment}
          className="btn btn-sm mt-2"
          style={{
            background: "linear-gradient(90deg, #36d1dc, #5b86e5)",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            padding: "6px 14px",
            fontWeight: "500",
          }}
        >
          Comment
        </button>
      </div>
    </div>
  );
}

export default PostCard;