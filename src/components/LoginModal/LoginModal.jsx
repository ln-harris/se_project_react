import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm.js";

function LoginModal({ isOpen, onClose, onLogin, onRegisterClick }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const isFormValid = Boolean(values.email && values.password);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(values, resetForm);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      name="login"
      title="Log In"
      buttonText="Log In"
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid}
      secondaryButtonText="or Sign Up"
      onSecondaryButtonClick={onRegisterClick}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          id="login-email"
          className="modal__input"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </label>

      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          id="login-password"
          className="modal__input"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
