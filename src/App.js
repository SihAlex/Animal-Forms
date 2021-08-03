import Header from "./components/Header";
import Main from "./pages/main/Main";
import Info from "./pages/info/Info";
import Login from "./pages/Login/Login";
import { CovidStatsContextProvider } from "./store/covid-stasts-context";
import { createTheme, ThemeProvider } from "@material-ui/core";

import { Route, Switch, Redirect } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#466D1D",
    },
    secondary: {
      main: "#6d1d46",
    },
    error: {
      main: "#db2d16",
    },
  },
});

function App() {
  return (
    <CovidStatsContextProvider>
      <ThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/main" />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/info">
            <Info />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <h1>Page not found</h1>
          </Route>
        </Switch>
      </ThemeProvider>
    </CovidStatsContextProvider>
  );
}

export default App;
