import { authActions } from "./auth";

const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_KEY}`;
const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_KEY}`;

const calculateRemainingTime = (expires) => {
  const currentTime = new Date().getTime();
  const expirationTime = new Date(expires).getTime();

  return currentTime - expirationTime;
};

export const signUp = (email, password) => {
  let errorMessage = "Authentication failed!";
  let expirationTime = 0;
  return (dispatch) => {
    fetch(signUpURL, {
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
    setTimeout(
      dispatch(authActions.logout()),
      calculateRemainingTime(expirationTime)
    );
  };
};

export const signIn = (email, password) => {
  let errorMessage = "Authentication failed!";
  return (dispatch) => {
    fetch(signInURL, {
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
            dispatch(
              authActions.login({
                token: data.idToken,
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
      .catch((error) => dispatch(authActions.setError(error)));
  };
};
