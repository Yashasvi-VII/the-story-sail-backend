import db from "../driver/mysql.js";
import { createPost } from "../models/blog.js";

//Create Post
export const addPost = (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  // validations check

  if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    return res.status(201).json({
      success: true,
      result: createPost(title, content),
      message: "Sucessfully created post",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error from here" });
  }
};

// Get Post
export const getPost = (req, res) => {
  try {
    const query = "SELECT * FROM posts";
    db.query(query, (err, data) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error from here" });
  }
};

//Get Post By ID
export const getById = (req, res) => {
  const id = req.params.id;

  // validations check
  if (parseInt(id) <= 0) {
    return res.status(400).json({ message: "Bad Request" });
  }

  try {
    const query = `SELECT * FROM posts where id =?`;
    db.query(query, id, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ message: "Not Found" });
      }
      if (data.length == 0) {
        return res.status(404).json({ message: "Not Found" });
      }
      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error from here" });
  }
};

//Update Posts by Id
export const putPost = (req, res) => {
  const id = req.params.id;

  const title = req.body.title;
  const content = req.body.content;

  // validations check
  if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ error: "Content is required" });
  }

  const checkQuery = "SELECT * FROM posts WHERE id = ?";
  db.query(checkQuery, [id], (err, result) => {
    if (err) {
      console.error("Error executing the query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // if posts does not exist give error message
    if (result.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    // If the post with the given ID exists, update the data
    const qry = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
    db.query(qry, [title, content, id], (err, data) => {
      if (err) {
        console.error("Error updating the post:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json({ message: "Post updated successfully" });
    });
  });
};

//Delete Posts by Id
export const deletePost = (req, res) => {
  const id = req.params.id;

  // check if posts exits in database or not
  const checkQuery = "SELECT * FROM posts WHERE id = ?";
  db.query(checkQuery, [id], (err, result) => {
    if (err) {
      console.error("Error executing the query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // if posts does not exist give error message
    if (result.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    // If the post with the given ID exists, delete the data
    const qry = "DELETE FROM posts WHERE id = ?";
    db.query(qry, id, (err, data) => {
      if (err) {
        console.error("Error updating the post:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json({ message: "Post deleted successfully" });
    });
  });
};
