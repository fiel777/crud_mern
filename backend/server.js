const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

// PORT from .env
const PORT = process.env.PORT;

const app = express();

//Middleware for HTTP Request //

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Mongoose Connect

async function start() {
  await mongoose.connect("mongodb://127.0.0.1:27017/myDatabase");
  console.log("Database is Connected");


// Create Schema

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
});

// Create Model

const postModel = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  res.send("Express is connected");
});

// create Posts

app.post("/create", (req, res) => {
  postModel
    .create({
      title: req.body.title,
      description: req.body.description,
      createdAt: req.body.createdAt,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  res.status(200).json({ message: "Post request received successfully!" });
  console.log(req.body);
});

//getPosts
app.get("/posts", (req, res) => {
  postModel
    .find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

//count
// app.get("/count", (req, res) => {
//   postModel
//     .count()
//     .then((count) => res.json({ count: count }))
//     .catch((err) => console.log(err));
// });

//deletePosts
app.delete("/delete/:id", (req, res) => {
  postModel
    .findByIdAndDelete({ _id: req.params.id })
    .then(() => res.status(200))
    .catch((err) => console.log(err));
});

//editPosts
app.put("/update/:id", (req, res) => {
  postModel
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        description: req.body.description,
        createdAt: req.body.createdAt,
      }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

//applisten
app.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});

}

start();
