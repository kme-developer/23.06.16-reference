// routes>index.js

const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/personal_project")
    .catch(error => console.log(error));
};

mongoose.connection.on("error", error => {
  console.error("MongoDB connection error!", error);
});

module.exports = connect;
