import { useFormik } from "formik";

import { Button, Box } from "@material-ui/core";
import CustomInputComponent from "../../../components/CustomInputComponent";
import Form from "../../../components/FormWrapper";

import validationSchema from "../validation/TodoEntryFormValidation";
import { useDispatch } from "react-redux";
import { todoActions } from "../../../store/redux/todo-list";
const initialValues = {
  title: "",
  task: "",
};

export default function TodoEntryForm(props) {
  const dispatch = useDispatch();

  function onSubmit(values) {
    const { title, task: content } = values;
    dispatch(todoActions.addItem({ title, content, completed: false }));
    props.onClose();
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Box maxWidth="40rem" margin="0 auto">
      <Form onSubmit={formik.handleSubmit}>
        <CustomInputComponent
          label="Title"
          id="title"
          name="title"
          error={formik.touched.title && formik.errors.title}
          helperText={formik.touched.title && formik.errors.title}
          {...formik.getFieldProps("title")}
        />

        <CustomInputComponent
          label="Task"
          id="task"
          name="task"
          error={formik.touched.task && formik.errors.task}
          helperText={formik.touched.task && formik.errors.task}
          {...formik.getFieldProps("task")}
        />
        <Box display="flex" justifyContent="center">
          <Button color="primary" variant="contained" type="submit">
            Add
          </Button>
        </Box>
      </Form>
    </Box>
  );
}
