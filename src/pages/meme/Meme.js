import { Box, Button, CircularProgress } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMemes } from "../../store/redux/meme-api-actions";

const Meme = () => {
  const dispatch = useDispatch();

  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = useCallback(() => {
    setIsUpdating(true);
    dispatch(getMemes());
    setIsUpdating(false);
  }, [dispatch]);

  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  const meme = useSelector((state) => state.meme);

  return (
    <Box
      width="40rem"
      margin="0 auto"
      padding="1rem"
      textAlign="center"
      display="flex"
      flexDirection="column"
    >
      {isUpdating ? (
        <Box margin="0 auto">
          <CircularProgress />
        </Box>
      ) : (
        <img src={meme.url} />
      )}
      <Button
        onClick={handleUpdate}
        variant="contained"
        color="primary"
        style={{ margin: "1rem auto 0", width: "40%" }}
        disabled={isUpdating}
      >
        New meme!
      </Button>
    </Box>
  );
};

export default Meme;
