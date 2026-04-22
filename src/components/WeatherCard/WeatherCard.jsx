import "./WeatherCard.css";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../utils/constants.js";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

function WeatherCard({ weatherData, isLoading }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = weatherData.isDay
      ? defaultWeatherOptions.day
      : defaultWeatherOptions.night;
  } else {
    weatherOption = filteredOptions[0];
  }

  const weatherOptionUrl = weatherOption?.url;

  return (
    <section className="weather-card">
      <div className="weather-card__temp">
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            {weatherData.temp[currentTemperatureUnit]}&deg;{currentTemperatureUnit}
          </>
        )}
      </div>
      <img
        src={weatherOptionUrl}
        alt={`Card showing ${
          weatherOption?.day ? "daytime" : "nighttime"
        } ${weatherOption?.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
