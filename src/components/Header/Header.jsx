import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        +Add clothes
      </button>
      <div className="header__user-container">
        <Link to="/profile" className="header__username">
          Terrence Tegegne
        </Link>
        <img className="header__avatar" src={avatar} alt="Terrence Tegegne" />
      </div>
    </header>
  );
}
export default Header;
