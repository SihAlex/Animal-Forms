import * as Yup from "yup";

export default function validationSchema() {
  return Yup.object({
    name: Yup.string()
      .required("Required!")
      .matches(/^[a-zA-Z]*$/, "Use only letters!")
      .min(2, "Your cat's name couldn't consist of only one letter, bruh..."),
    breed: Yup.string()
      .required("Required!")
      .matches(/^[a-zA-Z]*$/, "Use only letters!"),
    weight: Yup.number()
      .required("Required!")
      .typeError("A number is required!"),
  });
}
