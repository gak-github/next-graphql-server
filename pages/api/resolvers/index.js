//import TodoSchema from '../lib/models/Todos';
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

export const resolvers = {
  Query: {
    todos: async (_parent, args, _context, _info) => {
      try {
        const todos = await _context.Todo.find();
        console.log("====== before returning _mapData====");
        // return [ { _id: 'abcd1234', title: 'test message', completed: false }];
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
        const todo = await _context.Todo.create({title, completed });
        if (todo) {
          return { _id: todo._id, title: todo.title, completed: todo.completed };
        }
        return {};
      } catch (error) {
        console.log("=====error while adding a new todo==", error);
        return {};
      }
    },
    deleteTodo: async (_parent, args, _context, _info) => {
      try {
        const todo = await _context.Todo.findById(args.id);
        if (!todo) {
          return { _id: args.id };
        }
        await todo.remove();
        return { _id: args.id };
      } catch (error) {
        console.log("=====error while deleting a todo==", error);

      }
    },
    updateTodo: async (_parent, args, _context, _info) => {
      try {
        const todo = await _context.Todo.findById(args.id);
        if (!todo) {
          return {};
        }
        todo.completed = args.completed;
        const updatedTo = await todo.save();
        if (!updatedTo) {
          return {};
        }
        return { _id: updatedTo._id, title: updatedTo.title, completed: updatedTo.completed };
      } catch (error) {
        console.log("=====error while deleting a todo==", error);
      }
    }
  }
};