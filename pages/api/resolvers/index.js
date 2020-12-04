import TodoSchema from '../lib/models/Todos';
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
        // _initModel();
        // console.log("=====before calling todos====");
        // const todos = await Todo.find();
        // console.log("=====after calling todos", todos);
        const todos = [
          {
            _id: '5e6e532ecd6ae2618d8e2385',
            title: 'test',
            completed: true,
          },
          {
            _id: "5e6e79963300c76495fe4422",
            title: 'do exercise',
            completed: true,
          }
        ];
        console.log("====== before returning _mapData====");
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
        return {};
      } catch (error) {
        console.log("=====error while adding a new todo==", error);
        return {};
      }
    },
    deleteTodo: async (_parent, args, _context, _info) => {
      try {
        const todo = await Todo.findById(args.id);
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
        const todo = await Todo.findById(args.id);
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