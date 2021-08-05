import { Component } from "react";

import { Button, Box } from "@material-ui/core";

import CustomInputComponent from "../../components/CustomInputComponent";
import Form from "../../components/FormWrapper";

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
      timer: 0,
    };
  }

  handleChange({ target }) {
    const { formValues } = this.state;
    formValues[target.name] = target.value;
    this.setState({ formValues });
    this.handleValidation(target);
  }

  handleValidation(target) {
    const { name, value } = target;
    const fieldValidationErrors = this.state.formErrors;
    const validity = this.state.formValidity;
    const isEmail = name === "email";
    const isPassword = name === "password";
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    validity[name] = value.length > 0;
    fieldValidationErrors[name] = validity[name]
      ? ""
      : `${name} is required and cannot be empty`;
    if (validity[name]) {
      if (isEmail) {
        validity[name] = emailTest.test(value);
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be a valid email address`;
      }
      if (isPassword) {
        validity[name] = value.length >= 3;
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be minimum 3 characters in length`;
      }
    }
    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    const { formValues, formValidity } = this.state;
    if (Object.values(formValidity).every(Boolean)) {
      alert("Form is validated! Submitting the form...");
      this.setState({ isSubmitting: false });
    } else {
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key],
        };
        this.handleValidation(target);
      }
      this.setState({ isSubmitting: false });
    }
  }

  timer() {
    const interval = setInterval(() => {
      this.setState((state) => ({ timer: state.timer + 1 }));
    }, 1000);
    return interval;
  }

  componentDidMount() {
    this.timer();
  }

  componentWillUnmount() {
    clearInterval(this.timer());
  }

  render() {
    const { formValues, formErrors, isSubmitting, timer } = this.state;
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Box marginTop="2rem" bgcolor="primary.main">
          <h2
            style={{ textAlign: "center", fontSize: "2.4rem", color: "white" }}
          >
            Login
          </h2>
        </Box>
        <div>
          <CustomInputComponent
            label="Email"
            id="email"
            name="email"
            type="email"
            onChange={this.handleChange.bind(this)}
            value={formValues.email}
          />
        </div>
        <div>
          <CustomInputComponent
            label="Password"
            id="password"
            name="password"
            type="password"
            onChange={this.handleChange.bind(this)}
            value={formValues.password}
          />
        </div>
        <Button color="primary" variant="contained" type="submit">
          Login/Register
        </Button>
        <div>{timer}</div>
      </Form>
    );
  }
}
