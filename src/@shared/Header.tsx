import { useAuth } from "../@hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

import * as css from "./Header.css";

export function Header() {
  const navigate = useNavigate();
  const { isLogin, logout } = useAuth();

  return (
    <div className={css.container}>
      <Link to="/" className={css.logo}>
        / Jaam Toast
      </Link>
      {isLogin && (
        <button
          className={css.logoutButton}
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Log out
        </button>
      )}
    </div>
  );
}
