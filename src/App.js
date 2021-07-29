import Header from "./components/Header";
import Main from "./scenes/main/Main";
import Footer from "./components/Footer";
import { CovidStatsContextProvider } from "./components/store/covid-stasts-context";
import { createTheme, ThemeProvider } from "@material-ui/core";

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
        <Main />
        <Footer />
      </ThemeProvider>
    </CovidStatsContextProvider>
  );
}

export default App;
