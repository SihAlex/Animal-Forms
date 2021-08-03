import { useFormik } from "formik";
import Button from "@material-ui/core/Button";

import validationSchema from "../validation/CatsFormValidation";
import CustomInputComponent from "./components/CustomInputComponent";
import Form from "./components/FormWrapper";

const initialValues = {
  name: "",
  breed: "",
  weight: "",
};

function onSubmit(values) {
  alert(JSON.stringify(values));
}

export default function Login() {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <CustomInputComponent
        label="Email"
        id="name"
        name="name"
        error={formik.touched.name && formik.errors.name}
        helperText={formik.touched.name && formik.errors.name}
        {...formik.getFieldProps("name")}
      />

      <CustomInputComponent
        label="Password"
        id="breed"
        name="breed"
        error={formik.touched.breed && formik.errors.breed}
        helperText={formik.touched.breed && formik.errors.breed}
        {...formik.getFieldProps("breed")}
      />

      <Button color="primary" variant="contained" type="submit">
        Login/Register
      </Button>
    </Form>
  );
}
