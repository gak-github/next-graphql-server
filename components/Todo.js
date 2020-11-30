import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Todo = ({ todo }) => {
  const { updateTodo, deleteTodo } = useContext(GlobalContext);
  const getStyle = () => {
    return {
      background: '#f4f4f4',
      borderBottom: '1px #ccc dotted',
      padding: '10px',
      textDecoration: todo.completed ? 'line-through' : 'none'
    }
  };

  const changeStatus = (e) => {
    todo.completed = !todo.completed;
    if (todo.completed) {
      e.target.checked = true; // checkbox will be enabled if the task is complete
    }
    updateTodo(todo);
  };

  return (
    <div style= { getStyle() }>
      <p>
        <input type="checkbox" onChange={ changeStatus } checked={todo.completed}/>
          {" "}{todo.title}
        <button
          onClick={() => deleteTodo(todo._id)}
          style={btnStyle}
        >
          x
        </button>
      </p>
    </div>
  );
};

const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '5px 9px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right',
  fontSize: '18px'
}


export default Todo;