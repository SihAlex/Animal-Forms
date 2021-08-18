import CatsForm from "./forms/CatsForm";
import DogsForm from "./forms/DogsForm";
import FishesForm from "./forms/FishesForm";
import ParrotsForm from "./forms/ParrotsForm";

import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageText: {
    textAlign: "center",
    fontSize: "2.4rem",
    color: theme.palette.primary.text,
    padding: "2rem",
  },
  container: {
    maxWidth: "40rem",
    padding: 0,
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "1rem",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "97.5%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Main() {
  const [form, setForm] = useState("");
  const classes = useStyles();

  function handleNameChange(event) {
    setForm(event.target.value);
  }

  function getChosenForm(form) {
    let chosenForm = null;
    switch (form) {
      case "cats":
        chosenForm = <CatsForm />;
        break;
      case "dogs":
        chosenForm = <DogsForm />;
        break;
      case "fishes":
        chosenForm = <FishesForm />;
        break;
      case "parrots":
        chosenForm = <ParrotsForm />;
        break;
      default:
    }
    return chosenForm;
  }

  return (
    <Box maxWidth="60rem" margin="0 auto">
      <Box marginTop="2rem" bgcolor="primary.main">
        <h2 className={classes.pageText}>Choose one form:</h2>
      </Box>
      <Container className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel id="form-select-label">Form</InputLabel>
          <Select
            labelId="form-select-label"
            id="selectForm"
            name="selectForm"
            onChange={handleNameChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="cats" onChange={handleNameChange}>
              Cats
            </MenuItem>
            <MenuItem value="dogs">Dogs</MenuItem>
            <MenuItem value="fishes">Fishes</MenuItem>
            <MenuItem value="parrots">Parrots</MenuItem>
          </Select>
        </FormControl>
        {getChosenForm(form)}
      </Container>
    </Box>
  );
}
