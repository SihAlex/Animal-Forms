import * as Yup from "yup";

export default function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .required("Required!")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Wrong email format!"
      ),
    password: Yup.string()
      .required("Required!")
      .min(6, "Your password should be at least 6 characters long!"),
  });
}
