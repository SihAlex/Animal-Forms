import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dragHandler: {
    fontSize: "2rem",
    padding: "0 1rem",
    color: theme.palette.primary.main,
    textAlign: "center",
    "&:hover": {
      cursor: "move",
    },
  },
}));

const DragHandler = (props) => {
  const classes = useStyles();

  return (
    <div {...props.dragHandleProps} className={classes.dragHandler}>
      =
    </div>
  );
};

export default DragHandler;
