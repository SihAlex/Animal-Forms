import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: "1.2rem 0",
    font: "bolder 2.2rem Arial, sans-serif",
    backgroundColor: "#466D1D",
    color: "white",
  },
  nav: {
    maxWidth: "60%",
    margin: "0 auto 0",
    "& ul": {
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      maxWidth: "95%",
      padding: "0 2.5%",
      margin: 0,
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    "& li": {
      listStyle: "none",
    },
    "& li:not(:last-child)": {
      [theme.breakpoints.down("sm")]: {
        marginBottom: "1rem",
      },
    },
    "& a": {
      textDecoration: "none",
      color: "white",
    },
    "& a:active, a.active, a:hover": {
      textDecoration: "none",
      color: "lightgreen",
    },
  },
}));

export default function Header() {
  const classes = useStyles();

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
          <li>
            <NavLink to="/meme">?</NavLink>
          </li>
          <li>
            <NavLink to="/todo">TODO</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
