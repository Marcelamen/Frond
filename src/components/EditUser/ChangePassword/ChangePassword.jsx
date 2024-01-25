import React, { useState } from "react";
import "./ChangePassword.css";
import { dataDecrypt } from "../../../util/encrypt.js/";
import { postNewPw } from "../../../services/auth.services.js";


const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const user = dataDecrypt(sessionStorage.getItem("user"));

  const validatePassword = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const minLength = 8;

    return (
      uppercaseRegex.test(password) &&
      specialCharRegex.test(password) &&
      numberRegex.test(password) &&
      password.length >= minLength
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Las nuevas contraseñas no coinciden. Por favor, inténtelo de nuevo.");
      return;
    }

    if (!validatePassword(password)) {
      setMessage("La nueva contraseña no cumple con los requisitos de seguridad.");
      return;
    }

    try {
      const id = user.id;
      const result = await postNewPw(password, id, currentPassword);

      console.log(result);
      setMessage(result.message);

    } catch (error) {
      console.log(error);
      setMessage("Error al cambiar la contraseña. Inténtelo de nuevo.");
    }
  };

  return (
    <>
      <h3 className="change-password-heading">Cambio de Contraseña</h3>
      <form onSubmit={handleSubmit} className="change-password-form">
        <label htmlFor="currentPassword" className="password-label">Contraseña Actual:</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="password-input"
        />

        <label htmlFor="password" className="password-label">Nueva Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required
          className="password-input"
        />

        <label htmlFor="confirmPassword" className="password-label">Confirmar Nueva Contraseña:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="password-input"
        />

        <button type="submit" className="change-password-button">Cambiar Contraseña</button>

        {message && <p className="password-message">{message}</p>}
      </form>
    </>
  );
};

export { ChangePassword };