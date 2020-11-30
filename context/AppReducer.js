export default (state, action) => {
    const todoList = (state, action) => {
      const index = state.todos.findIndex(
        todo => todo._id === action.payload._id
      );
      state.todos[index] = action.payload;
      return state.todos;
    };
    switch (action.type) {
      case "GET_TODOS":
        return {
          ...state,
          loading: true,
          todos: action.payload
        }
      case "TODOS_ERROR":
        return {
          ...state,
          error: action.payload
        }
      case "ADD_TODO":
        return {
          ...state,
          todos: [...state.todos, action.payload]
        }
      case "UPDATE_TODO":
        return {
          ...state,
          todos: todoList(state, action)
        }
      case "DELETE_TODO":
        return {
          ...state,
          todos: state.todos.filter(
            todo => todo._id !== action.payload
          )
        }
      default:
        return state
    }
  };