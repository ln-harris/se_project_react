import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm.js";

function RegisterModal({ isOpen, onClose, onRegister, onLoginClick }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const isFormValid = Boolean(
    values.email && values.password && values.name && values.avatar,
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(values, resetForm);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      name="register"
      title="Sign Up"
      buttonText="Sign Up"
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid}
      secondaryButtonText="or Log In"
      onSecondaryButtonClick={onLoginClick}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*
        <input
          id="register-email"
          className="modal__input"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </label>

      <label htmlFor="register-password" className="modal__label">
        Password*
        <input
          id="register-password"
          className="modal__input"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>

      <label htmlFor="register-name" className="modal__label">
        Name*
        <input
          id="register-name"
          className="modal__input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </label>

      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL*
        <input
          id="register-avatar"
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

export default RegisterModal;
