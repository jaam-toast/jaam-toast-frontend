import * as css from "./header.css";
// import { useUser } from "src/hooks/useUserStore";
import { BLACK, WHITE } from "src/config/colors";
// import useAuth from "src/hooks/useAuth";

export function Header() {
  // const user = useUser();
  // const { logout } = useAuth();

  return (
    <div className={css.container}>
      <a href="/" className={css.logo}>
        / Jaam Toast
      </a>
      {true && (
        <button className={css.logoutButton} onClick={() => {}}>
          Log out
        </button>
      )}
    </div>
  );
}
