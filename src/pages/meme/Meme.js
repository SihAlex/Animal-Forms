import { Button } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMemes } from "../../store/meme-api-actions";

const Meme = () => {
  const dispatch = useDispatch();

  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = useCallback(() => {
    setIsUpdating(true);
    dispatch(getMemes());
    setIsUpdating(false);
  }, []);

  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  const meme = useSelector((state) => state.meme);

  return (
    <div
      style={{
        width: "40rem",
        margin: "0 auto",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isUpdating ? "Loading..." : <img src={meme.url} />}
      <Button
        onClick={handleUpdate}
        variant="contained"
        color="primary"
        style={{ margin: "1rem auto 0", width: "40%" }}
        disabled={isUpdating}
      >
        New meme!
      </Button>
    </div>
  );
};

export default Meme;
