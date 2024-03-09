const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const app = express();

//Database Connection
main()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/quora");
}

//listen
let port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//view setup
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

//Using post and other methods
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//Schema and model
const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },

  content: {
    type: String,
  },
  createdAt: Date,
});

const Post = mongoose.model("post", postSchema);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/posts", async (req, res) => {
  let posts = await Post.find();
  //   console.log(posts);
  res.render("posts.ejs", { posts });
});

app.get("/posts/:id", async (req, res) => {
  //   console.log(req.params);
  let { id } = req.params;
  //   console.log(id);

  let post = await Post.findById(id);
  //   console.log(post);
  let randImg =
    "https://source.unsplash.com/random/300x200?sig=${Math.random()}";
  res.render("post", { post, randImg });
});

//Adding new Posts
app.get("/posts/add/new", (req, res) => {
  res.render("addNew.ejs");
});

app.post("/posts", async (req, res) => {
  // console.log(req.body);
  let { username, heading, content } = req.body;
  let newPost = new Post({
    username: username,
    heading: heading,
    content: content,
    createdAt: new Date(),
  });
  await newPost.save();
  res.redirect("/posts");
});

//Update Posts
app.get("/posts/update/:id", async (req, res) => {
  let { id } = req.params;
  let post = await Post.findById(id);
  res.render("updateForm.ejs", { post });
});

app.patch("/posts/:id", async (req, res) => {
  let { id } = req.params;
  let { heading: newHeading, content: newContent } = req.body;

  let updatePost = await Post.findByIdAndUpdate(
    id,
    {
      heading: newHeading,
      content: newContent,
      createdAt: new Date(),
    },
    { runValidators: true, new: true }
  );
  console.log(updatePost);
  res.redirect("/posts");
});

app.delete("/posts/:id", async (req, res) => {
  let { id } = req.params;

  let deletedPost = await Post.findByIdAndDelete(id);
  //   console.log(deletedPost);

  res.redirect("/posts");
});
