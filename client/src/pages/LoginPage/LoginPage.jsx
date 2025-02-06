import { useState } from "react";
import style from "./Loginpage.module.scss";
import useLogin from "../../hooks/useLogin";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className={style.login}>
      <div className={style.login_form}>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          {error && (
            <div className={style.error}>
              {error}
            </div>
          )}

          <label>Email</label>
          <input
            type="text"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className={style.button} disabled={isLoading} type="submit">
            Login
          </button>


        </form>
      </div>
    </div>
  );
}
