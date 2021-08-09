import { Component } from "react";

import { Button, Box } from "@material-ui/core";

import CustomInputComponent from "../../components/CustomInputComponent";
import Form from "../../components/FormWrapper";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: "",
        validity: false,
        error: "",
      },
      password: {
        value: "",
        validity: false,
        error: "",
      },
      timer: 0,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.state[name].value = value;
    this.setState(this.state[name]);
    this.handleValidation(this.state[name]);
  }

  handleValidation(field) {
    let error = field.error;
    let validity = field.validity;
    const isEmail = field.name === "email";
    const isPassword = field.name === "password";
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    validity = field.value.length > 0;
    error = validity ? "" : `${field.name} is required and cannot be empty`;
    if (validity) {
      if (isEmail) {
        validity = emailTest.test(field.value);
        error = validity ? "" : `${field.name} should be a valid email address`;
      }
      if (isPassword) {
        validity = field.value.length >= 3;
        error = validity
          ? ""
          : `${field.name} should be minimum 3 characters in length`;
      }
    }
    this.setState({
      [field.name]: { value: field.value, validity, error },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    if (email.validity && password.validity) {
      alert("Form is validated! Submitting the form...");
      this.setState({
        email: {
          value: "",
          validity: false,
          error: "",
        },
        password: {
          value: "",
          validity: false,
          error: "",
        },
      });
    } else {
      this.handleValidation({ name: "email", value: email.value });
      this.handleValidation({ name: "password", value: password.value });
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
    const { email, password, timer } = this.state;
    return (
      <Box maxWidth="60rem" margin="0 auto">
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Box marginTop="2rem" bgcolor="primary.main">
            <h2
              style={{
                textAlign: "center",
                fontSize: "2.4rem",
                color: "white",
              }}
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
              value={email.value}
            />
          </div>
          <div>
            <CustomInputComponent
              label="Password"
              id="password"
              name="password"
              type="password"
              onChange={this.handleChange.bind(this)}
              value={password.value}
            />
          </div>
          <Button color="primary" variant="contained" type="submit">
            Login/Register
          </Button>
          <div>{timer}</div>
        </Form>
      </Box>
    );
  }
}
