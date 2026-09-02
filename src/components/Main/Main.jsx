import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import "./Main.css";

function Main({
  weatherData,
  clothingItems,
  onCardClick,
  onCardLike,
  isLoading,
  weatherError,
}) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);

  const filteredItems = weatherError
    ? clothingItems
    : clothingItems.filter((item) => item.weather === weatherData.type);

  return (
    <main className="main">
      <WeatherCard
        weatherData={weatherData}
        isLoading={isLoading}
        weatherError={weatherError}
      />

      <section className="cards">
        <p className="cards__text">
          {isLoading
            ? "Loading weather..."
            : weatherError
              ? weatherError
              : `Today is ${weatherData.temp[currentTemperatureUnit]}°${currentTemperatureUnit} / You may want to wear:`}
        </p>

        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
