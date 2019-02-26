const express = require("express");
const db = require("../models");
const router = express.Router();

// POST /posts - creates new post
router.post("/", (req, res) => {
  db.post
    .create({
      title: req.body.title,
      content: req.body.content,
      authorId: req.body.authorId
    })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.status(500).render("main/500");
    });
});

// GET /posts/new - send new form
router.get("/new", (req, res) => {
  db.author
    .findAll()
    .then(authors => {
      res.render("posts/new", { authors });
    })
    .catch(err => {
      res.status(500).render("main/500");
    });
});

// GET /posts/:id - reads one post
router.get("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  db.post
    .findOne({
      where: { id },
      include: [db.author]
    })
    .then(post => {
      if (!post) throw Error();
      res.render("posts/show", { post });
    })
    .catch(error => {
      res.status(500).render("main/500");
    });
});

module.exports = router;
