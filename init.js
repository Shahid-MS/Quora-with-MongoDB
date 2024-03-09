const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
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

// let post1 = new Post({
//   username: "MS",
//   heading: "Lets Java",
//   content: "Java is best coding language",
//   createdAt: new Date(),
// });
// post1
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });


Post.insertMany([
  {
    username: "MS",
    heading: "Lets Java",
    content: "Java is best coding language",
    createdAt: new Date(),
  },
  {
    username: "PS",
    heading: "Banking",
    content: "Learn banking",
    createdAt: new Date(),
  },
  {
    username: "AS",
    heading: "Stock",
    content: "Lets go for Stock Market",
    createdAt: new Date(),
  },
]);
