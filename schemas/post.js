// schemas>posts.js

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    title: {
      type: String, 
      required: true
    },
    content: {
      type: String, 
      required: true
    }
  },
  {
    timestamps: true, // createdAt
    versionKey: false
  },
);

module.exports = mongoose.model("Post", postSchema);
