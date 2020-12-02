/*
const Todo = require("./models/Todos");

// @desc Get all todos
// @route GET /.netlify/functions/todo
// @access Public
exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({
      success: true,
      count: todos.count,
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc To add a todo (task)
// @route POST /.netlify/functions/todo
// @access Public
exports.addTodo = async (req, res, next) => {
  const { title, completed } = req.body;
  try {
    const todo = await Todo.create(req.body);
    return res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message)
      return res.status(500).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc To delete a task (todo)
// @route DELETE /.netlify/functions/todo/:id
// @access Public
exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "No todo found",
      });
    }

    await todo.remove();
    return res.status(200).json({
      success: true,
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc To update a task (todo) status
// @route DELETE /.netlify/functions/todo/:id
// @access Public
exports.updateTodo = async (req, res, next) => {
  const { completed } = req.body;
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "No todo found",
      });
    }

    todo.completed = completed;
    const updtedTodo = await todo.save();
    return res.status(200).json({
      success: true,
      data: updtedTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
*/