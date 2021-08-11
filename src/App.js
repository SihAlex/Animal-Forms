import Header from "./components/Header";

import { createTheme, ThemeProvider } from "@material-ui/core";
import { CovidStatsContextProvider } from "./store/covid-stasts-context";

import Routes from "./Routes";
import Footer from "./components/Footer";

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
    <ThemeProvider theme={theme}>
      <Header />
      <CovidStatsContextProvider>
        <Routes />
      </CovidStatsContextProvider>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
