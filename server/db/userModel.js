const mongoose = require("mongoose");
const Todo = require("./todoModel")

const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "Please provide username"],
    unique: [true, "Username already exists"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },

  todos: [{type: mongoose.Schema.Types.ObjectId, ref: "Todos"}],
});

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);

