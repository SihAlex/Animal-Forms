import { Box } from "@material-ui/core";

const ErrorMsg = (props) => {
  return (
    <Box color="error.main" paddingTop="1rem">
      {props.errorMsg.split("_").join(" ")}
    </Box>
  );
};

export default ErrorMsg;
