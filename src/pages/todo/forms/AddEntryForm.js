import { useFormik } from "formik";
import Button from "@material-ui/core/Button";

import CustomInputComponent from "../../../components/CustomInputComponent";
import Form from "../../../components/FormWrapper";

const initialValues = {
  name: "",
  breed: "",
  weight: "",
};

function onSubmit(values) {
  alert(JSON.stringify(values));
}

export default function AddEntryForm() {
  const formik = useFormik({
    initialValues,
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

      <Button color="primary" variant="contained" type="submit">
        Submit
      </Button>
    </Form>
  );
}
