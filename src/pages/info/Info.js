import { makeStyles } from "@material-ui/core/styles";

import { useContext } from "react";

import { CovidStatsContext } from "../../store/covid-stasts-context";

const useStyles = makeStyles((theme) => ({
  info: {
    display: "flex",
    justifyContent: "center",
    font: "bolder 2.2rem Arial, sans-serif",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    maxWidth: "60rem",
    margin: "0 auto",
    "& > *": {
      maxWidth: "50rem",
    },
    "& > ul": {
      margin: 0,
      paddingBottom: "2rem",
      "& > li": { listStyle: "none" },
    },
    marginTop: "2rem",
  },
}));

export default function Info() {
  const classes = useStyles();

  const covStatsCtx = useContext(CovidStatsContext);

  const stats = covStatsCtx ? (
    <ul>
      <h2>Covid Statistics</h2>
      <li>Country: {covStatsCtx.country}</li>
      <li>Confirmed: {covStatsCtx.confirmed}</li>
      <li>Critical: {covStatsCtx.critical}</li>
      <li>Deaths: {covStatsCtx.deaths}</li>
    </ul>
  ) : (
    ""
  );

  return <div className={classes.info}>{stats}</div>;
}
