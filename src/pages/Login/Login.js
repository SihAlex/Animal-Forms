import { Component } from "react";

import { useFormik } from "formik";
import { Button, Box } from "@material-ui/core";

import CustomInputComponent from "../../components/CustomInputComponent";
import Form from "../../components/FormWrapper";

const initialValues = {
  email: "",
  password: "",
};

function onSubmit(values) {
  alert(JSON.stringify(values));
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        email: "",
        password: "",
      },
      formErrors: {
        email: "",
        password: "",
      },
      formValidity: {
        email: false,
        password: false,
      },
      isSubmitting: false,
    };
  }
  render() {
    const { formValues, formErrors, isSubmitting } = this.state;
    return (
      <Form>
        <Box color="primary">
          <h2
            style={{ textAlign: "center", fontSize: "2.4rem", color: "white" }}
          >
            Login
          </h2>
        </Box>
        <div>
          <CustomInputComponent />
        </div>
        <div>
          <CustomInputComponent />
        </div>
        <Button color="primary" variant="contained" type="submit">
          Login/Register
        </Button>
      </Form>
    );
  }
}
