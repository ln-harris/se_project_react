import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm.js";

const AddItemModal = ({ isOpen, onAddItem, onClose, buttonText }) => {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItem(values, resetForm);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      name="add-garment"
      title="New garment"
      buttonText={buttonText}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{""}
        <input
          className="modal__input"
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="image-url" className="modal__label">
        Image{""}
        <input
          className="modal__input"
          type="url"
          id="image-url"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">
          Select the weather type:
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              name="weather"
              value="hot"
              checked={values.weather === "hot"}
              onChange={handleChange}
              className="modal__radio-input"
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              type="radio"
              name="weather"
              value="warm"
              checked={values.weather === "warm"}
              onChange={handleChange}
              className="modal__radio-input"
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              type="radio"
              name="weather"
              value="cold"
              checked={values.weather === "cold"}
              onChange={handleChange}
              className="modal__radio-input"
            />
            Cold
          </label>
        </legend>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
