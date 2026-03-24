import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="cards__item" onClick={() => onCardClick(item)}>
      <h2 className="cards__title">{item.name}</h2>
      <img className="cards__image" src={item.link} alt={item.name} />
    </li>
  );
}

export default ItemCard;
