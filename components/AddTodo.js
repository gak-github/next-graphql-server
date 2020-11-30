import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const AddTodo = () => {
  const { addTodo } = useContext(GlobalContext);

  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    if (title === "") {
      return;
    }
    const newTodo = {
      title,
      completed
    };

    addTodo(newTodo);
    setTitle("");
  };

  return (
    <div>
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <input
            type="text"
            name="title"
            value={title}
            onChange={ e => {
                setTitle(e.target.value);
                setCompleted(false);
              }
            }
            placeholder="Enter the task to do..."
            style={{ flex: '10', padding: '5px'}}
          />
          <input
            type="submit"
            value="Add"
            className="btn"
            style={{ flex: '1' }}
          />
      </form>
    </div>
  );
};

export default AddTodo;