import { makeStyles, Button, Checkbox } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../../store/todo-list";

const useStyles = makeStyles({
  todoListItem: {
    display: "flex",
    flexDirection: "column",
    minWidth: "30rem",
  },
  todoListItem__content: {
    display: "flex",
  },
});

const TodoListItem = (props) => {
  const classes = useStyles();

  const { id, title, content, completed } = props.item;

  const [check, setCheck] = useState(completed);
  const dispatch = useDispatch();

  const removeEntryHandler = () => {
    dispatch(todoActions.removeItem(id));
  };

  const toggleHandler = (event) => {
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

  return (
    <li className={classes.todoListItem}>
      <div className={classes.todoListItem__content}>
        <Checkbox onChange={toggleHandler} checked={check} />
        <h2>{title}</h2>
      </div>
      <div>
        <p>{content}</p>
      </div>
      <Button color="secondary" onClick={removeEntryHandler}>
        Remove entry
      </Button>
    </li>
  );
};

export default TodoListItem;
