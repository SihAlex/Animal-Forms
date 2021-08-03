<<<<<<< HEAD
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  greet: {
    padding: "1.2rem 0",
    display: "flex",
    justifyContent: "center",
    font: "bolder 2.2rem Arial, sans-serif",
    backgroundColor: "#466D1D",
    color: "white",
    "& > *": {
      "max-width": "50rem",
=======
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  header: {
    padding: "1.2rem 0",
    font: "bolder 2.2rem Arial, sans-serif",
    backgroundColor: "#466D1D",
    color: "white",
  },
  nav: {
    "& ul": {
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      maxWidth: "95%",
      padding: "0 2.5%",
      margin: 0,
    },
    "& li": {
      listStyle: "none",
    },
    "& a": {
      textDecoration: "none",
      color: "white",
    },
    "& a:active, a.active, a:hover": {
      textDecoration: "none",
      color: "lightgreen",
>>>>>>> Added routing.
    },
  },
}));

export default function Header() {
  const classes = useStyles();
<<<<<<< HEAD
  let greet = <div>Choose the one form you'd like to work with!</div>;

  return <div className={classes.greet}>{greet}</div>;
=======

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/main">Main</NavLink>
          </li>
          <li>
            <NavLink to="/info">Info</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
>>>>>>> Added routing.
}
