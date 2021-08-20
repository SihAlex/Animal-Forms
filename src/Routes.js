import React, { Suspense } from "react";

import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import { Box, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { makeStyles } from "@material-ui/core";

const Main = React.lazy(() => import("./pages/main/Main"));
const Info = React.lazy(() => import("./pages/info/Info"));
const Meme = React.lazy(() => import("./pages/meme/Meme"));
const TodoList = React.lazy(() => import("./pages/todo/TodoList"));
const Login = React.lazy(() => import("./pages/Login/Login"));

const useStyles = makeStyles((theme) => ({
  fadeEnter: {
    opacity: 0,
    zIndex: 1,
  },
  fadeEnterActive: {
    opacity: 1,
    transition: "opacity 250ms ease",
  },
  fadeExit: {
    opacity: 0,
  },
  fadeExitActive: {
    opacity: 0,
  },
}));

const ProtectedRoute = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { component: Component, ...routeProps } = props;
  return (
    <Route
      {...routeProps}
      render={(componentProps) =>
        isLoggedIn ? (
          <Component {...componentProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const LoginRoute = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { component: Component, ...routeProps } = props;

  return (
    <Route
      {...routeProps}
      render={(componentProps) =>
        isLoggedIn ? <Redirect to="/main" /> : <Component {...componentProps} />
      }
    />
  );
};

const Routes = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const classes = useStyles();
  const location = useLocation();
  return (
    <Suspense
      fallback={
        <Box position="absolute" top="50%" left="50%">
          <CircularProgress />
        </Box>
      }
    >
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={250}
          unmountOnExit
          classNames={{
            enter: classes.fadeEnter,
            enterActive: classes.fadeEnterActive,
            exit: classes.fadeExit,
            exitActive: classes.fadeExitActive,
          }}
        >
          <Switch location={location}>
            <Route path="/" exact>
              {isLoggedIn ? <Redirect to="/main" /> : <Redirect to="/login" />}
            </Route>
            <ProtectedRoute path="/main" component={Main} />
            <ProtectedRoute path="/info" component={Info} />
            <ProtectedRoute path="/meme" component={Meme} />
            <ProtectedRoute path="/todo" component={TodoList} />
            <LoginRoute path="/login" component={Login} />
            <Route path="*">
              <h1 style={{ color: "white", margin: "1rem" }}>Page not found</h1>
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Suspense>
  );
};

export default Routes;
