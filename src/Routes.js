import React, { Suspense, useEffect } from "react";
import { auth } from "./firebase";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import { Box, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

const Main = React.lazy(() => import("./pages/main/Main"));
const Info = React.lazy(() => import("./pages/info/Info"));
const Meme = React.lazy(() => import("./pages/meme/Meme"));
const TodoList = React.lazy(() => import("./pages/todo/TodoList"));
const Login = React.lazy(() => import("./pages/Login/Login"));

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

  return (
    <Suspense
      fallback={
        <Box position="absolute" top="50%" left="50%">
          <CircularProgress />
        </Box>
      }
    >
      <Switch>
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
    </Suspense>
  );
};

export default Routes;
