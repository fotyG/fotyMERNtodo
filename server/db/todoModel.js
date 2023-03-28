const mongoose = require("mongoose");
const User = require("./userModel");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  description: {
    type: String,
    required: [true, "Please describe your task"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

module.exports = mongoose.model.Todos || mongoose.model("Todos", TodoSchema);