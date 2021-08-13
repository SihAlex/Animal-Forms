import React, { Suspense } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import { Box, CircularProgress } from "@material-ui/core";

const Main = React.lazy(() => import("./pages/main/Main"));
const Info = React.lazy(() => import("./pages/info/Info"));
const Meme = React.lazy(() => import("./pages/meme/Meme"));
const TodoList = React.lazy(() => import("./pages/todo/TodoList"));
const Login = React.lazy(() => import("./pages/Login/Login"));

const Routes = () => {
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
          <Redirect to="/main" />
        </Route>
        <Route path="/main" component={Main} />
        <Route path="/info" component={Info} />
        <Route path="/meme" component={Meme} />
        <Route path="/todo" component={TodoList} />
        <Route path="/login" component={Login} />
        <Route path="*">
          <h1>Page not found</h1>
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;
