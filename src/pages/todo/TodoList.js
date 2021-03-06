import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../../store/redux/todo-list";
import { todoListControlsActions } from "../../store/redux/todo-list-controls";

import { Button, makeStyles, Checkbox, Box } from "@material-ui/core";

import { useState } from "react";

import TodoEntryForm from "./forms/TodoEntryForm";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TodoListDraggable from "./TodoListDraggable";
import useCustomUnmount from "../../hooks/useCustomUnmount";

const useStyles = makeStyles({
  todoList: {
    margin: "0 auto",
    padding: "0 1rem",
    font: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& div.todoListItem": {
      listStyle: "none",
      display: "flex",
      alignItems: "center",
      order: 1,
      borderBottom: "0.2rem solid gray",
      backgroundColor: "white",
    },
  },
  listControls: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
    "& > *:not(:last-child)": {
      marginRight: "1rem",
    },
    color: "black",
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

  const todoList = useSelector((state) => state.todo.todoList);

  const [mount, unmountHandler] = useCustomUnmount();

  const todoShowConfirmation = useSelector(
    (state) => state.todoControls.showConfirmation
  );
  const [showConfirmation, setShowConfirmation] =
    useState(todoShowConfirmation);

  const classes = useStyles();

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
    todoList.forEach((item) => {
      item.completed &&
        unmountHandler(() => {
          confirmation && dispatch(todoActions.removeItem(item.id));
        }, 200);
    });
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

  const todoListContent = (
    <DragDropContext
      onDragEnd={(param) => {
        dispatch(todoActions.replaceItem(param));
      }}
    >
      <ul
        className={classes.todoList}
        style={{
          backgroundColor: "white",
          borderRadius: "1rem",
          padding: "1rem",
          width: "36rem",
        }}
      >
        <Droppable droppableId="todoListDroppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver
                  ? "rgba(132, 170, 10, 0.9)"
                  : "white",
                border: snapshot.isDraggingOver
                  ? "1px #84AA0A solid"
                  : "1px white solid",
              }}
              {...provided.droppableProps}
            >
              {todoList.length === 0 ? (
                <h2>No entries have been made yet.</h2>
              ) : null}
              {todoList.map((item, index) => (
                <TodoListDraggable
                  key={item.id}
                  item={item}
                  index={index}
                  showConfirmation={showConfirmation}
                  mount={mount}
                  unmountHandler={unmountHandler}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </ul>
    </DragDropContext>
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
      {todoListContent}
    </Box>
  );
};

export default TodoList;
