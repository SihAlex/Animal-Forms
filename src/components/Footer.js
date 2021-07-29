import { makeStyles } from "@material-ui/core/styles";

import { useContext } from "react";

import { CovidStatsContext } from "./store/covid-stasts-context";

const useStyles = makeStyles(() => ({
  footer: {
    padding: "1rem 0",
    display: "flex",
    justifyContent: "center",
    font: "bolder 2.2rem Arial, sans-serif",
    backgroundColor: "#466D1D",
    color: "white",
    "& > *": {
      "max-width": "50rem",
    },
    marginTop: "2rem",
  },
}));

export default function Footer() {
  const classes = useStyles();

  const covStatsCtx = useContext(CovidStatsContext);
  return (
    <div className={classes.footer}>
      <ul style={{ listStyle: "none" }}>
        <p>Covid statistics</p>
        <li>Country: {covStatsCtx.country}</li>
        <li>Confirmed: {covStatsCtx.confirmed}</li>
        <li>Critical: {covStatsCtx.critical}</li>
        <li>Deaths: {covStatsCtx.deaths}</li>
      </ul>
    </div>
  );
}
