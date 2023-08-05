import db from "../driver/mysql.js";

export const createPost = (title, content) => {
  const values = [title, content];
  const query = "INSERT INTO posts (`title`, `content`) VALUES (?, ?)";

  db.query(query, values, (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, result: err });
    }
    return data.toString();
  });
};

export const getById = (id) => {
  const postId = id.toString();
  const values = [postId];
  const query = `SELECT * FROM posts where id =?`;

  db.query(query, values, (err, data) => {
    if (err) {
      return err;
    }
    return true;
  });
};

export const updatePost = (id, title, content) => {
  const values = [title, content];
  const query = "UPDATE posts SET `title`= ?, `content`= ? WHERE id = ?";

  db.query(query, [...values, postId], (err, data) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error from here", err });
    }
    return res.json(data);
  });
};
