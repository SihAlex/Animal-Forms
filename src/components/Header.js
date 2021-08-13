import { NavLink } from "react-router-dom";

import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import useWindowDimensions from "../hooks/useWindowDimensions";

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
  closeList: {
    textAlign: "center",
    paddingBottom: "1rem",
  },
  closeList__button: {
    border: "none",
    background: "none",
    color: "white",
    fontSize: "2rem",
    padding: 0,
    width: "2rem",
    "&:hover": {
      color: "lightgreen",
    },
  },
}));

export default function Header() {
  const classes = useStyles();

  const dimensions = useWindowDimensions();

  const [isOpen, setIsOpen] = useState(false);

  const openMenuHandler = () => {
    setIsOpen(true);
  };

  const closeMenuHandler = () => {
    setIsOpen(false);
  };

  const closeButton = (
    <div className={classes.closeList}>
      <button onClick={closeMenuHandler} className={classes.closeList__button}>
        X
      </button>
    </div>
  );

  const mobileClosedHeader = (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "2rem" }}></div>
      <NavLink to="/main">Main</NavLink>
      <div>
        <button onClick={openMenuHandler} className={classes.closeList__button}>
          +
        </button>
      </div>
    </div>
  );

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        {isOpen && dimensions.width <= 960 ? closeButton : null}

        {!isOpen && dimensions.width <= 960 ? (
          mobileClosedHeader
        ) : (
          <ul>
            <>
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
            </>
          </ul>
        )}
      </nav>
    </header>
  );
}
