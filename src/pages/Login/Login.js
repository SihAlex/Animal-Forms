import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import { Button, Box } from "@material-ui/core";

const Login = () => {
  const [form, setForm] = useState("login");

  const toggleFormHandler = () => {
    form === "login" ? setForm("register") : setForm("login");
  };

  const formContent = form === "login" ? <LoginForm /> : <RegisterForm />;
  const formToggleButtonText = form === "login" ? "Register" : "Login";
  return (
    <>
      {formContent}
      <Box textAlign="center" marginTop="1rem">
        <Button onClick={toggleFormHandler} variant="contained">
          {formToggleButtonText}
        </Button>
      </Box>
    </>
  );
};

export default Login;
