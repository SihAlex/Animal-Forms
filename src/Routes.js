import Main from "./pages/main/Main";
import Info from "./pages/info/Info";
import Login from "./pages/Login/Login";

import { Route, Switch, Redirect } from "react-router-dom";
import TodoList from "./pages/todo/TodoList";
import Meme from "./pages/meme/Meme";

const Routes = () => {
  return (
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
  );
};

export default Routes;
