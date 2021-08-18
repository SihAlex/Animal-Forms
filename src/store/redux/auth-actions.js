import { authActions } from "./auth";

const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_KEY}`;
const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_KEY}`;

export const signUp = (email, password) => {
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
      .then((response) => response.json())
      .then(({ idToken }) => {
        dispatch(authActions.login({ idToken }));
      })
      .catch((error) => dispatch(authActions.setError(error.message)));
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
            dispatch(authActions.login(data.idToken));
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
