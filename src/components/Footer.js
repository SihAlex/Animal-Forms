import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  footer: {
    padding: "1rem 0",
    display: "flex",
    justifyContent: "center",
    font: "bolder 2.2rem Arial, sans-serif",
    backgroundColor: "red",
    color: "black",
    "& > *": {
      "max-width": "50rem",
    },
    marginTop: "2rem",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <p>@Pipavsja v moe genjucu@</p>
    </div>
  );
}
