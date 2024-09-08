import experss from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { connectToDb } from "./database.js";

const app = experss();
const PORT = 3000;

app.use(experss.static("../public"));

app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type"],
  }),
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

const db = await connectToDb();

app.get("/api/", (req, res) => {
  let data = [];
  console.log("get");

  db.each(
    "SELECT id, comment FROM data",
    (err, row) => {
      if (err) {
        console.error("Error executing query:", err.message);
        return;
      }
      data.push(row);
    },
    () => {
      res.json(data);
    },
  );
});

app.post("/api/", (req, res) => {
  console.log("post");

  const newComment = JSON.parse(req.body).comment;

  if (!newComment) {
    return res.status(400).json({ error: "Comment text is required." });
  }

  const query = "INSERT INTO data (comment) VALUES (?)";

  db.run(query, [newComment], function (err) {
    if (err) {
      console.error("Error inserting comment: " + err.message);
      return res.status(500).json({ error: "Failed to add comment." });
    }

    console.log(`A row has been inserted with rowid ${this.lastID}`);
    return res.json({ id: this.lastID, text: newComment }); // Return the new comment with its ID
  });
});

app.post("/api/:id/delete", (req, res) => {
  const id = req.params.id;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID provided." });
  }

  const query = "DELETE FROM data WHERE id = ?";

  db.run(query, [id], function (err) {
    if (err) {
      console.error("Error deleting comment: " + err.message);
      return res.status(500).json({ error: "Failed to delete comment." });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Comment not found." });
    }

    console.log(`Comment with ID ${id} has been deleted.`);
    return res.json({
      success: true,
      message: `Comment with ID ${id} has been deleted.`,
    });
  });
});

app.post("/api/:id/patch", (req, res) => {
  const id = req.params.id;
  const comment = JSON.parse(req.body).comment;

  if (!id || isNaN(id) || !comment) {
    return res.status(400).json({ error: "Invalid request." });
  }

  const query = "UPDATE data SET comment = ? WHERE id = ?";

  db.run(query, [comment, id], function (err) {
    if (err) {
      console.error("Error updating comment: " + err.message);
      return res.status(500).json({ error: "Failed to update comment." });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Comment not found." });
    }

    console.log(`Comment with ID ${id} has been updated.`);
    return res.json({
      success: true,
      message: `Comment with ID ${id} has been updated.`,
    });
  });
});

app.listen(PORT, () => {
  console.log("Server is running");
});
