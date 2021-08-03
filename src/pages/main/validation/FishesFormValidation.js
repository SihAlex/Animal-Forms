import * as Yup from "yup";

export default function validationSchema() {
  return Yup.object({
    size: Yup.number().required("Required!").typeError("A number is required!"),
    habitat: Yup.string().required("Required!"),
    weight: Yup.number().required("Required!").typeError("A number is required!"),
  });
}
