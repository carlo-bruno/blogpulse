const express = require("express");
const db = require("../models");
const router = express.Router();

// GET /authors -read all authors
router.get("/", (req, res) => {
  db.author.findAll().then(authors => {
    res.render("authors/index", { authors });
  });
});

// POST /authors - create new author
router.post("/", (req, res) => {
  db.author
    .create({
      name: req.body.name
    })
    .then(author => {
      res.redirect("/authors");
    });
});

// GET /authors/new - send new author form
router.get("/new", (req, res) => {
  res.render("authors/new");
});

// GET /authors/:id - show one author + posts
router.get("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  db.author
    .findOne({
      where: { id },
      include: [db.post]
    })
    .then(author => {
      res.render("authors/show", { author });
    });
});

module.exports = router;
