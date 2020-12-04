import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
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
  const URL = '/api/graphql';
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

  const DELETE_TODO = `mutation deleteTodo($id: String!) {
    deleteTodo( id: $id) {
      _id
    }
  }`;

  const UPDATE_TODO = `mutation updateTodo($id: String!, $completed: Boolean!) {
    updateTodo( id: $id, completed: $completed) {
      _id
      title
      completed
    }
  }`;

  // get todo details
  async function getTodos() {
    try {
      console.log("=======before calling getTodos from globalstate=====");
      const res = await request(URL, GET_TODOS);
      console.log("=========after calling global state======", res.todos);
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
      await request(URL, DELETE_TODO, {id});
      dispatch({
        type: "DELETE_TODO",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TODO_ERROR",
        error: []
      })
    }
  }

  // addTodo action reducer
  async function addTodo(todo) {
    try {
      const res = await request(URL, ADD_TODO, todo);
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
    const { _id, completed } = todo;
    try {
      const res = await request(URL, UPDATE_TODO, { id: _id, completed });
      dispatch({
        type: "UPDATE_TODO",
        payload: res.updateTodo
      })
    } catch (error) {
      dispatch({
        type: "TODO_ERROR",
        error: []
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