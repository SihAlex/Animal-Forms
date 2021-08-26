import Header from "./components/Header";

import { createTheme, ThemeProvider } from "@material-ui/core";
import { CovidStatsContextProvider } from "./store/covid-stasts-context";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store/redux/auth";
import { onAuthStateChange } from "./firebase";
import { StyledFirebaseAuth } from "react-firebaseui";

import Routes from "./Routes";
import Footer from "./components/Footer";

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

const theme = lightTheme;

function App() {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setIsLoggedIn);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    isLoggedIn && dispatch(authActions.login());
  }, [isLoggedIn, dispatch]);

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
