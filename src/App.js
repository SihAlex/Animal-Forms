import Header from "./components/Header";

import { CovidStatsContextProvider } from "./store/covid-stasts-context";
import { createTheme, ThemeProvider } from "@material-ui/core";

import Routes from "./Routes";

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
        <Routes />
      </ThemeProvider>
    </CovidStatsContextProvider>
  );
}

export default App;
