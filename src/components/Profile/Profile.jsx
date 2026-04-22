import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

export default function Profile({ clothingItems, onCardClick, onAddClick }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
      />
    </section>
  );
}
