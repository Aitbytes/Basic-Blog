const express = require("express");
const routes = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('blog.mysqlite3');

// create table posts if not exists
db.serialize(function() {
  db.run("CREATE TABLE if not exists posts (author TEXT, date TEXT, content TEXT)");
});

// get all posts
routes.get("/", (req, res) => {
  db.all("SELECT * FROM posts", function(err, rows) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.render("blog", { text: "best blog posts", posts: rows });
    }
  });
});

// add new post
routes.post("/", (req, res) => {
  const { author, content } = req.body;
  const date = Date();

  const stmt = db.prepare("INSERT INTO posts VALUES (?, ?, ?)");
  stmt.run(author, date, content, function(err) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.redirect("/");
    }
  });
  stmt.finalize();
});

// delete a post
routes.post("/delete/:id", (req, res) => {
  const id = req.params.id;

  const stmt = db.prepare("DELETE FROM posts WHERE rowid=?");
  stmt.run(id, function(err) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.redirect("/");
    }
  });
  stmt.finalize();
});

module.exports = routes;
