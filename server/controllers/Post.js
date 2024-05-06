const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

const router = express.Router();

router.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      image: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});

router.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      res.status(400).json("not the author");
      alert("Invalid author");
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      image: newPath ? newPath : postDoc.image,
    });
    res.json(postDoc);
  });
});

router.delete("/post/:id/delete", async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const post = await Post.findById(id);

    if (post.author.toString() !== userId) {
      return res
        .status(401)
        .json({ message: "You are not authorised to delete" });
    }

    await Post.findByIdAndDelete(id);

    if (post.image) {
      fs.unlinkSync(post.image);
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

router.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

module.exports = router;
