import { useFormik } from "formik";
import { Button, Box } from "@material-ui/core";

import validationSchema from "./validation/LoginFormValidation";
import CustomInputComponent from "../../components/CustomInputComponent";
import Form from "../../components/FormWrapper";
import ErrorMsg from "../../components/ErrorMsg";

import { signIn } from "../../store/redux/auth-actions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const errorMsg = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (values) => {
    dispatch(signIn(values.email, values.password));
    history.replace("/");
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <Box margin="0 auto" bgcolor="primary.main" maxWidth="60rem">
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.4rem",
            color: "white",
            padding: "2rem",
          }}
        >
          Login
        </h2>
      </Box>
      <Box
        maxWidth="40rem"
        margin="0 auto"
        padding="1rem"
        bgcolor="white"
        borderRadius="1rem"
      >
        <Form onSubmit={formik.handleSubmit}>
          <div>
            <CustomInputComponent
              label="Email"
              id="email"
              name="email"
              type="email"
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              {...formik.getFieldProps("email")}
            />
          </div>
          <div>
            <CustomInputComponent
              label="Password"
              id="password"
              name="password"
              type="password"
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              {...formik.getFieldProps("password")}
            />
          </div>
          <Button color="primary" variant="contained" type="submit">
            Login
          </Button>
          <ErrorMsg errorMsg={errorMsg} />
        </Form>
      </Box>
    </>
  );
};

export default LoginForm;
