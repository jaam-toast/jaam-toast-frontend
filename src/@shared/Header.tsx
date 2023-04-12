import { useAuth } from "./useAuth";
import * as css from "./Header.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const logout = () => {
    Cookies.remove("loginData");
    navigate("/");
  };

  return (
    <div className={css.container}>
      <a href="/" className={css.logo}>
        / Jaam Toast
      </a>
      {user && (
        <button className={css.logoutButton} onClick={logout}>
          Log out
        </button>
      )}
    </div>
  );
}
