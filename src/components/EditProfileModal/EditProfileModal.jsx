import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import useForm from "../../hooks/useForm.js";

function EditProfileModal({ isOpen, onClose, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const isFormValid = Boolean(values.name && values.avatar);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateProfile(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      name="edit-profile"
      title="Change profile data"
      buttonText="Save changes"
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid}
    >
      <label htmlFor="profile-name" className="modal__label">
        Name*
        <input
          id="profile-name"
          className="modal__input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </label>

      <label htmlFor="profile-avatar" className="modal__label">
        Avatar*
        <input
          id="profile-avatar"
          className="modal__input"
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
