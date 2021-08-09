import { makeStyles, Button, Checkbox } from "@material-ui/core";

const useStyles = makeStyles({
  todoListItem: {
    display: "flex",
    flexDirection: "column",
  },
  todoListItem__content: {
    display: "flex",
  },
});

const TodoListItem = (props) => {
  const classes = useStyles();

  const { id, title, content } = props;

  return (
    <li className={classes.todoListItem}>
      <div className={classes.todoListItem__content}>
        <Checkbox />
        <h2>{title}</h2>
      </div>
      <div>
        <p>{content}</p>
      </div>
      <Button color="secondary">Remove entry</Button>
    </li>
  );
};

export default TodoListItem;
