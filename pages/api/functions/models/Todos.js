
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add the task"],
  },
  completed: {
    type: Boolean,
    required: [true, "Task status is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default TodoSchema;
// module.exports = mongoose.model("Todo", TodoSchema);