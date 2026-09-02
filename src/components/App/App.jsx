import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

import {
  addCardLike,
  addClothingItem,
  deleteClothingItem,
  getClothingItems,
  removeCardLike,
  updateUserProfile,
} from "../../utils/api.js";
import { register, authorize, checkToken } from "../../utils/auth.js";
import { filterWeatherData, getWeather } from "../../utils/weatherApi.js";
import { coordinates, apiKey } from "../../utils/constants.js";

import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

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
  const [authError, setAuthError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

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

  const handleRegisterClick = () => {
    setAuthError("");
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setAuthError("");
    setActiveModal("login");
  };

  const handleAddClick = () => {
    setAddItemError("");
    setActiveModal("add-garment");
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-confirmation");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setAddItemError("");
    setAuthError("");
    setActiveModal("");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const likeRequest = isLiked ? removeCardLike : addCardLike;

    return likeRequest(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) =>
            item._id === id ? mapApiItem(updatedCard) : item,
          ),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");

    return updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = ({ email, password }, resetForm) => {
    setAuthError("");

    return authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        resetForm();
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
        setCurrentUser({});
        setIsLoggedIn(false);
        setAuthError("Email or password incorrect");
      });
  };

  const handleRegister = ({ name, avatar, email, password }, resetForm) => {
    return register({ name, avatar, email, password })
      .then(() => {
        return handleLogin({ email, password }, resetForm);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }, resetForm) => {
    setAddItemError("");

    const token = localStorage.getItem("jwt");

    return addClothingItem({ name, imageUrl, weather }, token)
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

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  const handleDeleteConfirm = () => {
    setIsDeleting(true);

    const token = localStorage.getItem("jwt");

    return deleteClothingItem(selectedCard._id, token)
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
        setCurrentUser({});
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <currentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
      }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />

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
                    onCardLike={handleCardLike}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onAddClick={handleAddClick}
                      onEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                      onLogout={handleLogout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateProfile={handleUpdateProfile}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            onLoginClick={handleLoginClick}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            onRegisterClick={handleRegisterClick}
            errorMessage={authError}
          />

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
      </CurrentUserContext.Provider>
    </currentTemperatureUnitContext.Provider>
  );
}

export default App;
