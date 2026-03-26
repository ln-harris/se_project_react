import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card }) {
  if (!card || !card.link) {
    return null;
  }
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          className="modal__close modal__close_type_preview"
          type="button"
        ></button>
        <img className="modal__image" src={card.link} alt={card.name} />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
