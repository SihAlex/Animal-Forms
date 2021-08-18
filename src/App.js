import Header from "./components/Header";

import { createTheme, ThemeProvider, Radio } from "@material-ui/core";
import { CovidStatsContextProvider } from "./store/covid-stasts-context";

import { useState } from "react";

import Routes from "./Routes";
import Footer from "./components/Footer";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(132, 170, 10, 0.9)",
      text: "white",
      controls: "white",
    },
    secondary: {
      main: "#6d26fc",
    },
    error: {
      main: "#db2d16",
    },
    background: "#393939",
  },
});

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(132, 170, 10, 0.9)",
      text: "snow",
      controls: "black",
    },
    secondary: {
      main: "#6d26fc",
    },
    error: {
      main: "#db2d16",
    },
    background: "snow",
  },
});

const theme = darkTheme;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{ backgroundColor: theme.palette.background, height: "100%" }}
      >
        <Header />
        <CovidStatsContextProvider>
          <Routes />
        </CovidStatsContextProvider>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
