import { FormEvent } from "react";
import "./Login.scss";
import { useLogin } from "../../hooks/useLogin";
export const Login = () => {
  const { doLogin, error } = useLogin();
  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    doLogin(new FormData(event.target as HTMLFormElement));
  };
  return (
    <div className="login__wrap">
      <form onSubmit={handleLogin}>
        <img src="public/assets/post/SPN_1112.jpg" alt="" />
        <div className="form__area">
          <h2>This is</h2>
          <img src="public/assets/logo-white.png" alt="" />
          <h2>but I made it Kevin Tran themed.</h2>
          <input
            className="form__input"
            type="text"
            name="email"
            placeholder="Enter your email"
          />
          <input
            className="form__input"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <button type="submit">Login</button>
        </div>
      </form>
      {error && <h2>{error}</h2>}
    </div>
  );
};
