// schemas>comments.js

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },
    user: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    content: {
      type: String, 
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  },
);

module.exports = mongoose.model("Comment", commentSchema);
