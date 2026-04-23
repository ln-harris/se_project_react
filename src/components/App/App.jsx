import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import {
  addClothingItem,
  deleteClothingItem,
  getClothingItems,
} from "../../utils/api.js";
import { filterWeatherData, getWeather } from "../../utils/weatherApi.js";
import { coordinates, apiKey } from "../../utils/constants.js";
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
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isDeleting, setIsDeleting] = useState(false);
  const [addItemError, setAddItemError] = useState("");
  const [weatherError, setWeatherError] = useState("");

  const mapApiItem = (item) => ({
    ...item,
    link: item.imageUrl,
  });

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setAddItemError("");
    setActiveModal("add-garment");
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-confirmation");
  };

  const closeActiveModal = () => {
    setAddItemError("");
    setActiveModal("");
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }, resetForm) => {
    setAddItemError("");

    return addClothingItem({ name, imageUrl, weather })
      .then((item) => {
        setClothingItems((prevItems) => [mapApiItem(item), ...prevItems]);
        resetForm();
        closeActiveModal();
        return item;
      })
      .catch((err) => {
        console.error(err);
        setAddItemError("Unable to add item right now. Please try again.");
      });
  };

  const handleDeleteConfirm = () => {
    setIsDeleting(true);

    return deleteClothingItem(selectedCard._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id),
        );
        setSelectedCard({});
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsDeleting(false);
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
        setWeatherError("");
      })
      .catch((err) => {
        console.error(err);
        setWeatherError("Unable to load weather data right now.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getClothingItems()
      .then((items) => {
        setClothingItems(items.map(mapApiItem));
      })
      .catch(console.error);
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
                  weatherError={weatherError}
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          buttonText="Add garment"
          errorMessage={addItemError}
          onAddItem={handleAddItemSubmit}
          onClose={closeActiveModal}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
          onDeleteClick={handleDeleteClick}
        />
        <DeleteConfirmationModal
          isOpen={activeModal === "delete-confirmation"}
          onClose={closeActiveModal}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
        />
      </div>
    </currentTemperatureUnitContext.Provider>
  );
}

export default App;

// api key 773e187b6dae27c2c74d1474b57dc9e1
