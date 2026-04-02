import Post from "../models/Post.js";
import cloudinary from "../config/cloudinary.js";


// 📝 CREATE POST (TEXT + IMAGE)
export const createPost = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text && !req.file) {
      return res.status(400).json({ message: "Post cannot be empty" });
    }

    let imageUrl = "";

    // upload image if present
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "social_posts" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    const post = await Post.create({
      user: req.user._id,
      text,
      image: imageUrl
    });
const populatedPost = await Post.findById(post._id)
  .populate("user", "name email");

res.status(201).json(populatedPost);
   

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 🌍 GET ALL POSTS (FEED)
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .populate("comments.user", "name")
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 👍 LIKE / UNLIKE
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user._id.toString();

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      // UNLIKE
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // LIKE
      post.likes.push(req.user._id);
    }

    await post.save();

    res.json({
      message: alreadyLiked ? "Unliked" : "Liked",
      totalLikes: post.likes.length
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 💬 ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment required" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      user: req.user._id,
      text
    });

    await post.save();

    res.json({
      message: "Comment added",
      comments: post.comments
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};