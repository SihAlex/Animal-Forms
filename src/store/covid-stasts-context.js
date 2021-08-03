import React, { useState, useEffect } from "react";

export const CovidStatsContext = React.createContext({
  country: "",
  confirmed: 0,
  critical: 0,
  deaths: 0,
});

export const CovidStatsContextProvider = (props) => {
  const [covidData, setCovidData] = useState({
    country: "",
    confirmed: 0,
    critical: 0,
    deaths: 0,
  });

  useEffect(() => {
    fetch("https://covid-19-data.p.rapidapi.com/country?name=ukraine", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "a0f7c5da43msh43cddf003774a32p1628b6jsn45fa093bf6ae",
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCovidData({
          country: data[0].country,
          confirmed: data[0].confirmed,
          critical: data[0].critical,
          deaths: data[0].deaths,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <CovidStatsContext.Provider
      value={{
        country: covidData.country,
        confirmed: covidData.confirmed,
        critical: covidData.critical,
        deaths: covidData.deaths,
      }}
    >
      {props.children}
    </CovidStatsContext.Provider>
  );
};
