import { useFormik } from "formik";
import Button from "@material-ui/core/Button";

import validationSchema from "../validation/ParrotsFormValidation";
import CustomInputComponent from "./components/CustomInputComponent";
import Form from "./components/FormWrapper";

const initialValues = {
  name: "",
  habitat: "",
  age: "",
};

function onSubmit(values) {
  alert(JSON.stringify(values));
}

export default function DogsForm() {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <CustomInputComponent
        label="Name of your parrot is..."
        id="name"
        name="name"
        error={formik.touched.name && formik.errors.name}
        helperText={formik.touched.name && formik.errors.name}
        {...formik.getFieldProps("name")}
      />

      <CustomInputComponent
        label="It's habitat is..."
        id="habitat"
        name="habitat"
        error={formik.touched.habitat && formik.errors.habitat}
        helperText={formik.touched.habitat && formik.errors.habitat}
        {...formik.getFieldProps("habitat")}
      />

      <CustomInputComponent
        label="What is your parrot's age?"
        type="number"
        id="age"
        name="age"
        error={formik.touched.age && formik.errors.age}
        helperText={formik.touched.age && formik.errors.age}
        {...formik.getFieldProps("age")}
      />

      <Button color="primary" variant="contained" type="submit">
        Submit
      </Button>
    </Form>
  );
}
