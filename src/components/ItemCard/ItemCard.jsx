import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <li className="card">
      <img className="card__image" src={item.imageUrl} alt={item.name} />
      <p className="card__name">{item.name}</p>
    </li>
  );
}

export default ItemCard;
