import { useAuth } from "./useAuth";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import * as css from "./Header.css";

export function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const logout = () => {
    Cookies.remove("loginData");
    navigate("/");
  };

  return (
    <div className={css.container}>
      <Link to="/" className={css.logo}>
        / Jaam Toast
      </Link>
      {user && (
        <button className={css.logoutButton} onClick={logout}>
          Log out
        </button>
      )}
    </div>
  );
}
