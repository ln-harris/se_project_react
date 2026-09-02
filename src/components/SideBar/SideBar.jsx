import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function SideBar({ onEditProfileClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const userInitial = currentUser.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "";

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        {currentUser.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{userInitial}</div>
        )}

        <p className="sidebar__username">{currentUser.name}</p>
      </div>

      <button
        type="button"
        className="sidebar__button"
        onClick={onEditProfileClick}
      >
        Change profile data
      </button>

      <button type="button" className="sidebar__button" onClick={onLogout}>
        Log out
      </button>
    </aside>
  );
}

export default SideBar;
