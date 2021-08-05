import Main from "./pages/main/Main";
import Info from "./pages/info/Info";
import Login from "./pages/Login/Login";

import { Route, Switch, Redirect } from "react-router-dom";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/main" />
      </Route>
      <Route path="/main" component={Main} />
      <Route path="/info" component={Info} />
      <Route path="/login" component={Login} />
      <Route path="*">
        <h1>Page not found</h1>
      </Route>
    </Switch>
  );
};

export default Routes;
