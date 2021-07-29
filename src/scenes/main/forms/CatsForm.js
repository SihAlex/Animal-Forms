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

export default function DogsForm() {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <CustomInputComponent
        label="Name of your cat is..."
        id="name"
        name="name"
        error={formik.touched.name && formik.errors.name}
        helperText={formik.touched.name && formik.errors.name}
        {...formik.getFieldProps("name")}
      />

      <CustomInputComponent
        label="It's breed is..."
        id="breed"
        name="breed"
        error={formik.touched.breed && formik.errors.breed}
        helperText={formik.touched.breed && formik.errors.breed}
        {...formik.getFieldProps("breed")}
      />

      <CustomInputComponent
        label="What is your cat's weight?"
        type="number"
        id="weight"
        name="weight"
        error={formik.touched.weight && formik.errors.weight}
        helperText={formik.touched.weight && formik.errors.weight}
        {...formik.getFieldProps("weight")}
      />

      <Button color="primary" variant="contained" type="submit">
        Submit
      </Button>
    </Form>
  );
}
