import { memeActions } from "./meme-api";

const URL = "https://meme-api.herokuapp.com/gimme";

export const getMemes = () => {
  return (dispatch) => {
    fetch(URL)
      .then((response) => response.json())
      .then(({ title, url }) => {
        dispatch(memeActions.updateMeme({ title, url }));
      })
      .catch((error) => dispatch(error.message));
  };
};

export default getMemes;
