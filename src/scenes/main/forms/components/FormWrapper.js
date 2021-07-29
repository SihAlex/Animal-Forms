import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export default function FormWrapper(props) {
  const classes = useStyles();

  return (
    <form className={classes.form} {...props}>
      {props.children}
    </form>
  );
}
