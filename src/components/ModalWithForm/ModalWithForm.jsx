import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  isValid = true,
  secondaryButtonText,
  onSecondaryButtonClick,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal__opened" : ""}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>

        <button
          onClick={onClose}
          className="modal__close"
          type="button"
          aria-label="Close modal"
        />

        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}

          <div className="modal__actions">
            <button type="submit" className="modal__submit" disabled={!isValid}>
              {buttonText}
            </button>

            {secondaryButtonText && (
              <button
                type="button"
                className="modal__secondary-button"
                onClick={onSecondaryButtonClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
