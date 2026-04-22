import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, onDeleteClick }) {
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
          <div className="modal__footer-top">
            <h2 className="modal__caption">{card.name}</h2>
            <button
              type="button"
              className="modal__delete-button"
              onClick={onDeleteClick}
            >
              Delete item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
