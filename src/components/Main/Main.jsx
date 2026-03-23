import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import "./Main.css";
import { defaultClothingItems } from "../../utils/constants.jsx";

function Main() {
  return (
    <main className="main">
      <WeatherCard />
      <section className="cards">
        <p className="cards__text">
          Today is 75 &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems.map((item) => {
            return (
              <div className="cards__item" key={item._id}>
                <h2 className="cards__title">{item.name}</h2>
                <img className="cards__image" src={item.link} alt={item.name} />
              </div>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
