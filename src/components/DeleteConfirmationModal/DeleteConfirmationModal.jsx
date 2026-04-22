import "../ModalWithForm/ModalWithForm.css";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_confirmation">
        <button onClick={onClose} className="modal__close" type="button"></button>
        <p className="modal__confirmation-text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>
        <button
          type="button"
          className="modal__confirm-delete"
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Yes, delete item"}
        </button>
        <button
          type="button"
          className="modal__cancel-delete"
          onClick={onClose}
          disabled={isDeleting}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
