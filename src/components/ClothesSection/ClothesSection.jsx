import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ClothesSection({
  clothingItems,
  onCardClick,
  onCardLike,
  onAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser._id,
  );

  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h1 className="clothes-section__title">Your items</h1>

        <button
          type="button"
          className="clothes-section__add-button"
          onClick={onAddClick}
        >
          + Add new
        </button>
      </div>

      <ul className="clothes-section__items">
        {userClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
