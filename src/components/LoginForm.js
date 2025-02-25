import { useState } from "react";
import { validateEmail } from "../validators.js";
import FieldError from "./FieldError.js";
import useAuthStore from "../store/AuthStore.ts";

function LoginForm({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginError = useAuthStore((state) => state.error);

  console.log(loginError);

  const getIsFormValid = () => {
    return validateEmail(email) && password.length >= 8;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          id="email"
          name="email"
        />
        {email && !validateEmail(email) ? (
          <FieldError>L'email n'est pas valide</FieldError>
        ) : null}
        {loginError !== undefined ? (
          <FieldError>{loginError}</FieldError>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="password">Mot de passe</label>
        <input
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Mot de passe"
          id="password"
          name="password"
        />
        {email !== "" && password !== "" && password.length < 8 ? (
          <FieldError>
            Votre mot de passe doit contenir au moins 8 caractères
          </FieldError>
        ) : null}
      </div>
      <button
        className="btn"
        data-testid="login-button"
        type="submit"
        disabled={!getIsFormValid()}
      >
        Me connecter
      </button>
    </form>
  );
}

export default LoginForm;
