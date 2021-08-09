import { useDispatch, useSelector } from "react-redux";

import { Button, makeStyles, Container, Box } from "@material-ui/core";

import { todoActions } from "../../store/todo-list";
import { useState } from "react";

import TodoListItem from "./TodoListItem";
import AddEntryForm from "./forms/AddEntryForm";

const useStyles = makeStyles({
  todoList: {
    margin: 0,
    padding: "0 1rem",
    font: "inherit",
    display: "flex",
    justifyContent: "center",
    "& > li": {
      listStyle: "none",
      borderBottom: "0.2rem solid gray",
    },
  },
  listControls: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
    "& > Button": {
      marginRight: "1rem",
    },
  },
  pageText: {
    textAlign: "center",
    fontSize: "2.4rem",
    color: "white",
    padding: "2rem",
  },
});

const TodoList = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList) || [
    {
      id: "test",
      title: "Test",
      content: `Dancing with the dead
      Lost our hearts to the spiritus sanctus, praying
      Dancing with the dead
      Fell in love with the temper of skylight, God and lethal powers`,
    },
  ];

  const addItemHandler = () => {
    setShowAddForm(true);
  };

  return (
    <Box maxWidth="60rem" margin="0 auto">
      <Box marginTop="2rem" bgcolor="primary.main">
        <h2 className={classes.pageText}>TODO</h2>
      </Box>
      {showAddForm ? <AddEntryForm /> : null}
      <div className={classes.listControls}>
        <Button onClick={addItemHandler} color="primary" variant="contained">
          Add entry
        </Button>
        <Button color="secondary" variant="contained">
          Remove selected
        </Button>
      </div>
      <ul className={classes.todoList}>
        {todoList.length === 0 ? (
          <h2>"No entries have been made yet."</h2>
        ) : null}
        {todoList.map((item) => (
          <TodoListItem
            key={item.id}
            id={item.id}
            title={item.title}
            content={item.content}
          />
        ))}
      </ul>
    </Box>
  );
};

export default TodoList;
