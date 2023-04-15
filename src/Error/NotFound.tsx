import { Link } from "react-router-dom";
import * as css from "./index.css";

export function NotFound() {
  return (
    <section className={css.container}>
      <strong className={css.errorCode}>404</strong>
      <p className={css.errorMessage}>
        찾으시는 페이지는 없는 페이지예요.
        <br />
        대신 뒤로 가거나 home으로 갈 수 있어요.
      </p>
      <div className={css.buttonConsole}>
        <Link className={css.navigateButton} to="javascript:history.back()">
          go back
        </Link>
        <Link className={css.navigateButton} to="/">
          return to the home
        </Link>
      </div>
    </section>
  );
}
