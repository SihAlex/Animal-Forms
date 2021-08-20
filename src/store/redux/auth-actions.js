import { authActions } from "./auth";
import { auth } from "../../firebase";

export const signUp = (email, password) => {
  return (dispatch) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        dispatch(signUser(response.user));
      })
      .catch((error) => {
        dispatch(authActions.setError(error.message));
      });
  };
};

export const signIn = (email, password) => {
  return (dispatch) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        dispatch(signUser(response.user));
      })
      .catch((error) => {
        dispatch(authActions.setError(error.message));
      });
  };
};

export const signUser = (user) => {
  return (dispatch) => {
    dispatch(authActions.login());
  };
};

export const signOut = () => {
  return (dispatch) => {
    auth.signOut();
    dispatch(authActions.logout());
  };
};
