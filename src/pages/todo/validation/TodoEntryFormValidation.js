import * as Yup from "yup";

export default function validationSchema() {
  return Yup.object({
    title: Yup.string().required("Required!"),
    task: Yup.string().required("Required!"),
  });
}
