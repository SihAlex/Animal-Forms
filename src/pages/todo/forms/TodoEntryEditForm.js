import { useFormik } from "formik";

import { Button, Box } from "@material-ui/core";
import CustomInputComponent from "../../../components/CustomInputComponent";
import Form from "../../../components/FormWrapper";

import validationSchema from "../validation/TodoEntryFormValidation";
import { useDispatch } from "react-redux";
import { todoActions } from "../../../store/todo-list";

export default function TodoEntryEditForm(props) {
  const dispatch = useDispatch();

  const { id, title, content, completed } = props.item;
  const initialValues = {
    id,
    title,
    task: content,
    completed,
  };

  const onSubmit = (values) => {
    const { id, title, task: content, completed } = values;
    dispatch(todoActions.editItem({ id, title, content, completed }));
    props.onClose();
  };

  const closeFormHandler = () => {
    props.onClose();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Box width="100%" margin="0 auto">
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
        />{" "}
        <Box display="flex" justifyContent="flex-end">
          <Button color="primary" type="submit">
            Save
          </Button>
          <Button onClick={closeFormHandler} color="secondary">
            Close
          </Button>
        </Box>
      </Form>
    </Box>
  );
}
