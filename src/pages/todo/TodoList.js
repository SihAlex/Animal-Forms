import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../../store/todo-list";

import { Button, makeStyles, Checkbox, Box } from "@material-ui/core";

import { useState } from "react";

import TodoListItem from "./TodoListItem";
import TodoEntryForm from "./forms/TodoEntryForm";
import { todoListControlsActions } from "../../store/todo-list-controls";

const useStyles = makeStyles({
  todoList: {
    margin: 0,
    padding: "0 1rem",
    font: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > li.todoListItem": {
      listStyle: "none",
      borderBottom: "0.2rem solid gray",
    },
  },
  listControls: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
    "& > *:not(:last-child)": {
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

  const todoShowConfirmation = useSelector(
    (state) => state.todoControls.showConfirmation
  );
  const [showConfirmation, setShowConfirmation] =
    useState(todoShowConfirmation);

  const classes = useStyles();

  const todoList = useSelector((state) => state.todo.todoList);
  const dispatch = useDispatch();

  const showFormHandler = () => {
    setShowAddForm(true);
  };

  const closeFormHandler = () => {
    setShowAddForm(false);
  };

  const removeCompletedTasksHandler = () => {
    const confirmation = showConfirmation
      ? window.confirm("Are you sure you want to delete completed entries?")
      : true;
    dispatch(todoActions.removeCompletedItems());
  };

  const toggleConfirmationHandler = (event) => {
    const checkbox = event.target;
    if (!checkbox) {
      return;
    }
    setShowConfirmation(checkbox.checked);
    dispatch(todoListControlsActions.setShowConfirmation(checkbox.checked));
  };

  const removeCompletedEntriesButton = todoList.filter((item) => item.completed)
    .length > 0 && (
    <Button
      onClick={removeCompletedTasksHandler}
      color="secondary"
      variant="contained"
    >
      Remove completed tasks
    </Button>
  );

  const confirmationCheckbox = todoList.length > 0 && (
    <Box display="flex">
      <p>Removal confirmation</p>
      <Checkbox
        onChange={toggleConfirmationHandler}
        checked={showConfirmation}
      />
    </Box>
  );

  return (
    <Box maxWidth="60rem" margin="0 auto">
      <Box marginTop="2rem" bgcolor="primary.main">
        <h2 className={classes.pageText}>TODO</h2>
      </Box>
      {showAddForm ? <TodoEntryForm onClose={closeFormHandler} /> : null}
      <div className={classes.listControls}>
        {showAddForm ? (
          <Button
            onClick={closeFormHandler}
            color="secondary"
            variant="contained"
          >
            Close
          </Button>
        ) : (
          <>
            <Button
              onClick={showFormHandler}
              color="primary"
              variant="contained"
            >
              Add entry
            </Button>
            {removeCompletedEntriesButton}
            {confirmationCheckbox}
          </>
        )}
      </div>
      <ul className={classes.todoList}>
        {todoList.length === 0 ? <h2>No entries have been made yet.</h2> : null}
        {todoList.map((item) => (
          <TodoListItem
            key={item.id}
            item={item}
            showConfirmation={showConfirmation}
          />
        ))}
      </ul>
    </Box>
  );
};

export default TodoList;
