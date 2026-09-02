import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import heartFilled from "../../assets/heart_filled.svg";
import heartOutline from "../../assets/heart_outline.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = currentUser._id
    ? (item.likes || []).some((id) => id === currentUser._id)
    : false;

  const handleLike = (evt) => {
    evt.stopPropagation();

    onCardLike({
      id: item._id,
      isLiked,
    });
  };

  return (
    <li className="cards__item" onClick={() => onCardClick(item)}>
      <div className="cards__header">
        <h2 className="cards__title">{item.name}</h2>

        {currentUser._id && (
          <button
            type="button"
            className="cards__like-button"
            onClick={handleLike}
            aria-label={isLiked ? "Unlike item" : "Like item"}
          >
            <img
              className="cards__like-icon"
              src={isLiked ? heartFilled : heartOutline}
              alt=""
            />
          </button>
        )}
      </div>

      <img className="cards__image" src={item.link} alt={item.name} />
    </li>
  );
}

export default ItemCard;
