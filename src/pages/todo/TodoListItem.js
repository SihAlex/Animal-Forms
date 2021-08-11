import React from "react";
import { makeStyles, Button, Checkbox } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../../store/todo-list";
import TodoEntryEditForm from "./forms/TodoEntryEditForm";
import DragHandler from "../../components/DragHandler";

const useStyles = makeStyles({
  todoListItem: {
    display: "flex",
    flexDirection: "column",
    width: "30rem",
    order: 1,
  },
  todoListItem__container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoListItem__content: {
    paddingLeft: "5.25px",
  },
  todoListItem__controls: {
    display: "flex",
    justifyContent: "flex-end",
  },
  done: {
    order: 2,
  },
  doneTitle: {
    textDecoration: "line-through",
  },
});

const TodoListItem = (props) => {
  const classes = useStyles();

  const { id, title, content, completed } = props.item;

  const { showConfirmation } = props;

  const [check, setCheck] = useState(completed);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  const editEntryHandler = () => {
    setEditing(true);
  };

  const closeEditEntryHandler = () => {
    setEditing(false);
  };

  const removeEntryHandler = () => {
    const confirmation = showConfirmation
      ? window.confirm("Are you sure you want to delete this entry?")
      : true;
    confirmation && dispatch(todoActions.removeItem(id));
  };

  const toggleCompletionHandler = (event) => {
    const checkbox = event.target;
    if (!checkbox) {
      return;
    }
    setCheck(checkbox.checked);
    const action = checkbox.checked
      ? todoActions.check(id)
      : todoActions.uncheck(id);
    dispatch(action);
  };

  const todoEntryContent = editing ? (
    <TodoEntryEditForm item={props.item} onClose={closeEditEntryHandler} />
  ) : (
    <>
      <div className={classes.todoListItem__container}>
        <DragHandler />
        <h2 className={check ? classes.doneTitle : ""}>{title}</h2>
        <Checkbox onChange={toggleCompletionHandler} checked={check} />
      </div>
      <div className={classes.todoListItem__content}>
        <p>{content}</p>
      </div>
    </>
  );

  return (
    <li
      className={`todoListItem ${classes.todoListItem} ${
        check ? classes.done : ""
      }`}
    >
      {todoEntryContent}
      <div className={classes.todoListItem__controls}>
        {editing ? (
          ""
        ) : (
          <>
            <Button color="primary" onClick={editEntryHandler}>
              Edit entry
            </Button>
            <Button color="secondary" onClick={removeEntryHandler}>
              Remove entry
            </Button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoListItem;
