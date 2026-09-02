import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

export default function Profile({
  clothingItems,
  onCardClick,
  onCardLike,
  onAddClick,
  onEditProfileClick,
  onLogout,
}) {
  return (
    <main className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} onLogout={onLogout} />

      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onAddClick={onAddClick}
      />
    </main>
  );
}
