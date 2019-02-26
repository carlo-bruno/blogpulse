const express = require("express");
const db = require("./models");
const ejsLayouts = require("express-ejs-layouts");
const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("static"));
app.use(ejsLayouts);

app.get("/", (req, res) => {
  db.post
    .findAll({
      include: [db.author]
    })
    .then(posts => {
      res.render("main/index", { posts });
    });
});

app.use("/authors", require("./routes/authors"));
app.use("/posts", require("./routes/posts"));

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
