import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import "./Weather.css";

export default function Weather() {
  let [city, setCity] = useState("Tehran");
  let [displayCity, setDisplayCity] = useState(null);
  let [temperature, setTemperature] = useState(null);
  let [condition, setCondition] = useState(null);
  let [icon, setIcon] = useState(null);
  let [wind, setWind] = useState(null);

  useEffect(() => {
    apiCall();
  }, []);

  function apiCall() {
    let apiKey = "t59d1foebd7d6a037ffd3299548b5a20";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then((response) => {
      console.log(response);
      setTemperature(response.data.temperature.current);
      setCondition(response.data.condition.description);
      setIcon(response.data.condition.icon_url);
      setWind(response.data.wind.speed);
      setDisplayCity(response.data.city);
    });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    apiCall();
  }

  return (
    <div>
      <div className="container border">
        <div className="heading mb-5 d-flex">
          <form className="col-sm-7 form-js " onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control search-city"
                id="exampleInputPassword1"
                placeholder="Change city"
                onChange={updateCity}
              />
            </div>
          </form>
          <div className="col-2 d-none d-sm-block"></div>
          <h2 className="col-3 d-none d-sm-block">{displayCity}</h2>
        </div>

        <div className="border-top-0">
          <h3 className="d-block d-sm-none text-success text-center">
            {" "}
            {displayCity}
          </h3>
          <div className="row">
            <h2 className="col-sm-5">
              <span>{Math.round(temperature)} C</span>°
            </h2>
            <h4 className="col-sm-2 me-5">
              <a href="#disable">°C </a>|<a href="#disable">°F</a>
            </h4>
            <img src={icon} className="col-2 d-none d-sm-block ms-4" />
          </div>
          <div className="row mb-3">
            <h6 className="col-5  d-none d-sm-block">Wind: {wind}Km/h</h6>
            <div className="col-3 "></div>
            <h5 className="col-sm-3">
              <small>{condition}</small>
            </h5>
          </div>
        </div>
      </div>
      <div className="github-link">
        <a href="https://github.com/angel13431/weather-react" target="_blank">
          GitHub
        </a>
      </div>
    </div>
  );
}
