import { authActions } from "./auth";

export const calculateRemainingTime = (expires) => {
  const currentTime = new Date().getTime();
  const expirationTime = new Date(expires).getTime();

  return expirationTime - currentTime;
};

export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token") || "";
  const storedExpirationTime =
    localStorage.getItem("expirationTime") || new Date();

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("refreshToken");
    return null;
  }
  return { token: storedToken, expires: remainingTime };
};

const checkStoredToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const checkURL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_KEY}`;
    return (dispatch) => {
      fetch(checkURL, {
        method: "GET",
        body: JSON.stringify({
          idToken: token,
        }),
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            dispatch(authActions.checkStoredToken(!data[0].disabled));
          });
        } else {
          dispatch(authActions.checkStoredToken(false));
        }
      });
    };
  }
};

export const refreshStoredToken = () => {
  let errorMessage = "Authentication failed!";
  let expirationTime = 0;
  const refreshURL = `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_KEY}`;
  return (dispatch) => {
    fetch(refreshURL, {
      method: "POST",
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: localStorage.getItem("refreshToken"),
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            expirationTime = new Date(
              new Date().getTime() + +data.expires_in * 1000
            ).toISOString();
            dispatch(
              authActions.refreshStoredToken({
                token: data.id_token,
                expires: expirationTime,
              })
            );
            localStorage.setItem("refreshToken", data.refresh_token);
          });
        } else {
          return response.json().then((data) => {
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            dispatch(authActions.setError(errorMessage));
          });
        }
      })
      .catch((error) => dispatch(authActions.setError(error.message)));
  };
};

export const signUp = (email, password) => {
  const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_KEY}`;
  return (dispatch) => {
    dispatch(signUser(signUpURL, email, password));
  };
};

export const signIn = (email, password) => {
  const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_KEY}`;
  return (dispatch) => {
    dispatch(signUser(signInURL, email, password));
  };
};

export const signUser = (url, email, password) => {
  let errorMessage = "Authentication failed!";
  let expirationTime = 0;
  return (dispatch) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            expirationTime = new Date(
              new Date().getTime() + +data.expiresIn * 1000
            ).toISOString();
            dispatch(
              authActions.login({
                token: data.idToken,
                expires: expirationTime,
                refreshToken: data.refreshToken,
              })
            );
          });
        } else {
          return response.json().then((data) => {
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            dispatch(authActions.setError(errorMessage));
          });
        }
      })
      .catch((error) => dispatch(authActions.setError(error.message)));
    const timeout = setTimeout(() => {
      dispatch(authActions.logout(timeout));
    }, calculateRemainingTime(expirationTime));
  };
};
