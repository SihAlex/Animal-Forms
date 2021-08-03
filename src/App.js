import Header from "./components/Header";
<<<<<<< HEAD
import Main from "./scenes/main/Main";
import Footer from "./components/Footer";
import { CovidStatsContextProvider } from "./components/store/covid-stasts-context";
import { createTheme, ThemeProvider } from "@material-ui/core";

=======
import Main from "./pages/main/Main";
import Info from "./pages/info/Info";
import { CovidStatsContextProvider } from "./components/store/covid-stasts-context";
import { createTheme, ThemeProvider } from "@material-ui/core";

import { Route, Switch, Redirect } from "react-router-dom";

>>>>>>> Added routing.
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
<<<<<<< HEAD
        <Main />
        <Footer />
=======
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
          <Route path="*">
            <h1>Page not found</h1>
          </Route>
        </Switch>
>>>>>>> Added routing.
      </ThemeProvider>
    </CovidStatsContextProvider>
  );
}

export default App;
