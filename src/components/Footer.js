import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: "1.5rem 0",
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    font: "bolder 2.2rem Arial, sans-serif",
    textAlign: "center",
    backgroundColor: theme.background,
    "& > *": {
      maxWidth: "50rem",
      marginRight: "1rem",
    },
    marginTop: "2rem",
  },
}));

export default function Footer(props) {
  const classes = useStyles();

  return <div className={classes.footer}>{props.children}</div>;
}
