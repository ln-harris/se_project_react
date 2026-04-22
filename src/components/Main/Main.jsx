import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

function Main({ weatherData, clothingItems, onCardClick, isLoading }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} isLoading={isLoading} />
      <section className="cards">
        <p className="cards__text">
          {isLoading ? (
            "Loading weather..."
          ) : (
            <>
              Today is {weatherData.temp[currentTemperatureUnit]}&deg;
              {currentTemperatureUnit} / You may want to wear:
            </>
          )}
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
