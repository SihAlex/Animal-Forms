import { useFormik } from "formik";
import Button from "@material-ui/core/Button";

import validationSchema from "../validation/FishesFormValidation";
import CustomInputComponent from "./components/CustomInputComponent";
import Form from "./components/FormWrapper";

const initialValues = {
  size: "",
  habitat: "",
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
        label="Size of your fish is..."
        type="number"
        id="size"
        name="size"
        error={formik.touched.size && formik.errors.size}
        helperText={formik.touched.size && formik.errors.size}
        {...formik.getFieldProps("size")}
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
        label="What is your fish's weight?"
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
