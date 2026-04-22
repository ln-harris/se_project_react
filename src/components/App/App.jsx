import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { addClothingItem } from "../../utils/api.js";
import { filterWeatherData, getWeather } from "../../utils/weatherApi.js";
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants.js";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: null, C: null },
    city: "",
    condition: "",
    isDay: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }, resetForm) => {
    return addClothingItem({ name, imageUrl, weather }).then((item) => {
      setClothingItems([item, ...clothingItems]);
      resetForm();
      closeActiveModal();
      return item;
    });
  };

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };

    if (activeModal) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <currentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  isLoading={isLoading}
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          buttonText="Add garment"
          onAddItem={handleAddItemSubmit}
          onClose={closeActiveModal}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
        />
      </div>
    </currentTemperatureUnitContext.Provider>
  );
}

export default App;

// api key 773e187b6dae27c2c74d1474b57dc9e1
