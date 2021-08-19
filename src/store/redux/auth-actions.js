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

    return null;
  }

  return { token: storedToken, expires: remainingTime };
};

export const refreshStoredToken = () => {
  
}

export const signUp = (email, password) => {
  const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_KEY}`;
  signUser(signUpURL, email, password);
};

export const signIn = (email, password) => {
  const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_KEY}`;
  signUser(signInURL, email, password);
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
