import { useEffect, useState } from "react";
import API from "../api/axios";
import PostCard from "../components/PostCard";
import FloatingButton from "../components/FloatingButton";

const Home = () => {
  const [posts, setPosts] = useState([]);

  // 📥 FETCH POSTS
  const fetchPosts = async () => {
    try {
      const res = await API.get("/api/posts");
      
      setPosts(res.data);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #403c44 0%, #2575fc 100%)",
        padding: "20px 0",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "600px",
          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        }}
      >
        <h4
          className="mb-4"
          style={{
            color: "#fff",
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            letterSpacing: "1px",
          }}
        >
          Feed
        </h4>

        {posts.length === 0 ? (
          <p style={{ color: "#eee", fontStyle: "italic" }}>No posts yet...</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              refresh={fetchPosts}
            />
          ))
        )}
      </div>

      <FloatingButton />
    </div>
  );
};

export default Home;