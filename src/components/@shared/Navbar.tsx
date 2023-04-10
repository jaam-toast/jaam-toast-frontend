import * as css from "./Navbar.css";
import { useUser } from "src/hooks/useUserStore";
import { BLACK, WHITE } from "src/config/colors";
import useAuth from "src/hooks/useAuth";

function NavBar() {
  const user = useUser();
  const { logout } = useAuth();

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

export default NavBar;
