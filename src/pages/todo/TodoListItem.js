import React, { useEffect, useState } from "react";
import { makeStyles, Button, Checkbox } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { todoActions } from "../../store/redux/todo-list";
import TodoEntryEditForm from "./forms/TodoEntryEditForm";

const useStyles = makeStyles((theme) => ({
  todoListItem: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    width: "30rem",
  },
  todoListItem__container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.primary.main,
  },
  todoListItem__content: {
    paddingLeft: "5.25px",
    color: "black",
  },
  todoListItem__controls: {
    display: "flex",
    justifyContent: "flex-end",
  },
  doneTitle: {
    textDecoration: "line-through",
  },
}));

const TodoListItem = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id, title, content, completed } = props.item;

  const { showConfirmation, onUnmount } = props;

  const [check, setCheck] = useState(completed);
  const [editing, setEditing] = useState(false);

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
    if (confirmation) {
      onUnmount(() => {
        confirmation && dispatch(todoActions.removeItem(id));
      }, 200);
    }
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
        <h2 className={check ? classes.doneTitle : ""}>{title}</h2>
        <Checkbox onChange={toggleCompletionHandler} checked={check} />
      </div>
      <div className={classes.todoListItem__content}>
        <p>{content}</p>
      </div>
    </>
  );

  return (
    <li className={`${classes.todoListItem} ${check ? "done" : ""}`}>
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
