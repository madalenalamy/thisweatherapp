import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function SearchEngine() {
  let [city, setCity] = useState(null);
  let [weatherInfo, setWeatherInfo] = useState(null);

  function weatherData(response) {
    setWeatherInfo(
      <ul>
        <li>Temperature: {Math.round(response.data.main.temp)}°C</li>
        <li>Description: {response.data.weather[0].description}</li>
        <li>Humidity: {response.data.main.humidity}%</li>
        <li>Wind: {response.data.wind.speed}km/h</li>
        <li>
          <img
            src={`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
          />
        </li>
      </ul>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2d96d64425dca1d6eda00d942a281c0d&units=metric`;
    axios.get(apiUrl).then(weatherData);
  }

  function changeCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  return (
    <div className="weatherData">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Type a city..."
          onChange={changeCity}
        />
        <input type="submit" value="Search" />
        <div>{weatherInfo}</div>
      </form>
    </div>
  );
}
