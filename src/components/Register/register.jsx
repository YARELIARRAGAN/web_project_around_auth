import { useRef } from "react";
import { useFormValidation } from "../../utils/useFormValidation";
import { Link } from "react-router-dom";

export default function Register({onSubmitRegister}) {
  const { isFormValid, checkFormValidity, formRef } = useFormValidation();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    //autualizar la informcion del usuario
    onSubmitRegister(emailRef.current.value, passwordRef.current.value);
  }
 
  return (
    <div className="auth__container">
      <div className="auth__container_title">
        <h2 className="auth__title">Regístrate</h2>
      </div>
      <form
        className="auth__form auth__form_register"
        id="register-form"
        onSubmit={handleSubmit}
        ref={formRef}
        onInput={checkFormValidity}
      >
        <input
          className="auth__input auth__input_register_type_email"
          name="email"
          placeholder="Correo electrónico"
          id="email-login"
          required
          type="email"
          minLength="2"
          maxLength="50"
          ref={emailRef}
        />
        <span className="auth__input-error"></span>
        <input
          className="auth__input  auth__input_register_type_password"
          name="password"
          placeholder="Contraseña"
          id="password-register"
          required
          type="password"
          ref={passwordRef}
        />
        <span className="auth__input-error"></span>
        <button
          className="button auth__button"
          type="submit"
          disabled={!isFormValid}
        >
          Regístrate
        </button>
      </form>
      <div className="auth__container_register">
        <Link className="auth__register" to="/signin">
          ¿Ya eres miembro? Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
}
