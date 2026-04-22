import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

function SideBar() {
  return (
    <aside className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Terrence Tegegne" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </aside>
  );
}

export default SideBar;
