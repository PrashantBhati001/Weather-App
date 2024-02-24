import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  TextField,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid
} from "@mui/material";

export default function App() {
  const [text, setText] = useState("");
  const [notFound, setNotFound] = useState(null);
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});

  const getWeather = async (param) => {
    try {
      let res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=772da0097235448bb6e104000233108&q=${param}&aqi=no`
      );
      setText(param);
      setNotFound(false);
      console.log(res.data);
      setLocation(res.data.location.name + ", " + res.data.location.country);
      setData(res.data);
    } catch (err) {
      console.log(err);
      setText(param);
      setData({});
      setLocation("");
      if (err.response && err.response.status === 400) {
        console.log("failed");
        setNotFound(true);
      }
    }
  };

  useEffect(() => {}, [text]);

  return (
    <div className="App">
      <AppBar position="static" style={{ marginBottom: "1rem" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Weather App
          </Typography>
        </Toolbar>
      </AppBar>
      <TextField
        id="outlined-basic"
        label="Enter Location"
        variant="outlined"
        onChange={(ev) => {
          getWeather(ev.target.value);
        }}
      />
      {text && notFound === true ? (
        <h2 style={{ color: "red" }}>No matching location found</h2>
      ) : (
        <>
          {location ? (
            <>
              <h2>{location}</h2>
              <Box className="myContent">
                <img
                  src={"http:" + data.current.condition.icon}
                  alt={data.current.condition.text}
                />
                <Grid container spacing={1} padding={"1rem"}>
                  <Grid item xs={6} marginTop={"5px"} textAlign={"left"}>
                    Temperature
                  </Grid>
                  <Grid item xs={6} marginTop={"5px"} textAlign={"right"}>
                    {data.current.temp_c / data.current.temp_f}
                  </Grid>
                  <Grid item xs={6} marginTop={"5px"} textAlign={"left"}>
                    Condition
                  </Grid>
                  <Grid item xs={6} marginTop={"5px"} textAlign={"right"}>
                    {data.current.condition.text}
                  </Grid>
                  <Grid item xs={6} marginTop={"5px"} textAlign={"left"}>
                    Wind Speed
                  </Grid>
                  <Grid item xs={6} marginTop={"5px"} textAlign={"right"}>
                    {data.current.wind_kph} km/h
                  </Grid>
                  <Grid item xs={6} marginTop={"5px"} textAlign={"left"}>
                    Humidity
                  </Grid>
                  <Grid item xs={6} marginTop={"5px"} textAlign={"right"}>
                    {data.current.humidity} %
                  </Grid>
                  <Grid item xs={6} marginTop={"5px"} textAlign={"left"}>
                    Cloud Coverage
                  </Grid>
                  <Grid item xs={6} marginTop={"5px"} textAlign={"right"}>
                    {data.current.cloud} %
                  </Grid>
                  <Grid item xs={6} marginTop={"5px"} textAlign={"left"}>
                    Last Updated
                  </Grid>
                  <Grid item xs={6} marginTop={"5px"} textAlign={"right"}>
                    {data.current.last_updated}
                  </Grid>
                </Grid>
              </Box>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}
