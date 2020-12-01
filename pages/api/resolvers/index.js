import TodoSchema from '../functions/models/Todos';
import mongoose from 'mongoose';

const _mapData = (todos) => {
  if (!Array.isArray(todos)) {
    return [];
  }
  return todos.map((todo) => {
    if (!todo) {
      return;
    }
    return { _id: todo._id, title: todo.title, completed: todo.completed }
  })

};

let Todo;
const _initModel = () => {
  if (!Todo) {
    Todo = mongoose.model('Todo', TodoSchema);
  }
}

export const resolvers = {
  Query: {
    todos: async (_parent, args, _context, _info) => {
      try {
        _initModel();
        const todos = await Todo.find();
        return  _mapData(todos);
      } catch (error) {
        return [];
      }
    },
  },
  Mutation: {
    addTodo: async (_parent, args, _context, _info) => {
      const { title, completed } = args;
      try {
        const todo = await Todo.create({title, completed });
        if (todo) {
          return { _id: todo._id, title: todo.title, completed: todo.completed };
        }
        return [];
      } catch (error) {
        console.log("=====error while adding a new todo==", error);
        return [];
      }
    }
  }
};