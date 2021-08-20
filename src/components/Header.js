import { NavLink, Link } from "react-router-dom";

import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import useWindowDimensions from "../hooks/useWindowDimensions";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../store/redux/auth-actions";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: "0.5rem 0",
    font: "bolder 2rem Arial, sans-serif",
    backgroundColor: theme.palette.primary.main,
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
      color: theme.palette.primary.text,
    },
    "& a:active, a.active, a:hover": {
      textDecoration: "none",
      color: "#393939",
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
      color: "black",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

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

  const logoutHandler = () => {
    dispatch(signOut());
  };

  return (
    <header className={classes.header}>
      {isLoggedIn && (
        <nav className={classes.nav}>
          {isOpen && dimensions.width <= 960 ? closeButton : null}

          {!isOpen && dimensions.width <= 960 ? (
            mobileClosedHeader
          ) : (
            <ul>
              <li>
                <NavLink to="/main">Main</NavLink>
              </li>
              <li>
                <NavLink to="/info">Info</NavLink>
              </li>
              <li>
                <NavLink to="/meme">Chuckles</NavLink>
              </li>
              <li>
                <NavLink to="/todo">TODO</NavLink>
              </li>
              <li>
                <Link onClick={logoutHandler} to="/login">
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </nav>
      )}
    </header>
  );
}
