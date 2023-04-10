import { useAuth } from "./useAuth";
import * as css from "./Header.css";

export function Header() {
  const { user, logout } = useAuth();

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
