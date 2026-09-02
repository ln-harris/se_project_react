import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function Header({
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  weatherData,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userInitial = currentUser.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "";

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>

          <div className="header__user-container">
            <Link to="/profile" className="header__username">
              {currentUser.name}
            </Link>

            {currentUser.avatar ? (
              <img
                className="header__avatar"
                src={currentUser.avatar}
                alt={currentUser.name}
              />
            ) : (
              <div className="header__avatar-placeholder">{userInitial}</div>
            )}
          </div>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button
            type="button"
            className="header__auth-button"
            onClick={handleRegisterClick}
          >
            Sign up
          </button>

          <button
            type="button"
            className="header__auth-button"
            onClick={handleLoginClick}
          >
            Log in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
