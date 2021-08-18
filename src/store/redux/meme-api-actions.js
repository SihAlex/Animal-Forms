import { memeActions } from "./meme-api";

const URL = "https://meme-api.herokuapp.com/gimme";

export const getMemes = () => {
  return (dispatch) => {
    fetch(URL)
      .then((response) => response.json())
      .then(({ title, url }) => {
        dispatch(memeActions.updateMeme({ title, url }));
      })
      .catch((error) => dispatch(memeActions.error(error.message)));
  };
};

export default getMemes;
