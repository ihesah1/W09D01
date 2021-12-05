const mongoose = require("mongoose");


const todo = new mongoose.Schema({
  name: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("Todo", todo);