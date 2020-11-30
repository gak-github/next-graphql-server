import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import request from 'graphql-request';

// Initial state
const initialState = {
  todos: [],
  error: null,
  loading: true
};

// Create context
export const GlobalContext = createContext(initialState);

// provider compoment
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const GET_TODOS = `{
    todos {
      _id
      title
      completed
    }
  }`;
  const ADD_TODO = `mutation addTodo($title: String!, $completed: Boolean!) {
    addTodo( title: $title, completed: $completed) {
      _id
      title
      completed
    }
  }`;

  // get todo details
  async function getTodos() {
    try {
      const res = await request('/api/graphql', GET_TODOS)
      dispatch({
        type: "GET_TODOS",
        payload: res.todos
      });
    } catch (error) {
      console.log("=====error=======", error);
      dispatch({
        type: "TODO_ERROR",
        payload: []
      })
    }
  }
  // delete action reducer
  async function deleteTodo(id) {
    try {
      await axios.delete(`/.netlify/functions/todo/${id}`);
      dispatch({
        type: "DELETE_TODO",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TODO_ERROR",
        error: error.response.data.error
      })
    }
  }

  // addTodo action reducer
  async function addTodo(todo) {
    try {
      const res = await request('/api/graphql', ADD_TODO, todo);
      dispatch({
        type: "ADD_TODO",
        payload: res.addTodo
      })
    } catch (error) {
      console.log("=====error while adding a todo===", error);
      dispatch({
        type: "TODO_ERROR",
        payload: []
      })
    }
  }

  // updateTo action reducer
  async function updateTodo(todo) {
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };

    try {
      const res = await axios.put(`/.netlify/functions/todo/${todo._id}`, todo, config);
      dispatch({
        type: "UPDATE_TODO",
        payload: res.data.data
      })
    } catch (error) {
      dispatch({
        type: "TODO_ERROR",
        error: error.response.data.error
      })
    }
  }


  return (
    <GlobalContext.Provider
      value={{
        todos: state.todos,
        error: state.error,
        loading: state.loading,
        deleteTodo,
        addTodo,
        getTodos,
        updateTodo
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};