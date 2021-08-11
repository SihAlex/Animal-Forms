import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  dragHandler: {
    fontSize: "2rem",
    paddingRight: "2rem",
    "&:hover": {
      cursor: "move",
    },
  },
});

const DragHandler = () => {
  const classes = useStyles();

  return <div className={classes.dragHandler}>=</div>;
};

export default DragHandler;
