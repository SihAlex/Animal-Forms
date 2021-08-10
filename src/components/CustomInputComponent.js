import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    maxWidth: "100%",
  },
}));

export default function CustomInputComponent(props) {
  const classes = useStyles();

  return <TextField className={classes.root} {...props} />;
}
