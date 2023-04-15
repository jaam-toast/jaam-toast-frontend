import { Link } from "react-router-dom";
import * as css from "./index.css";

export function Error({
  code = 500,
  message = "An unknown error has occurred.",
}: {
  code?: number;
  message?: string;
}) {
  return (
    <section className={css.container}>
      <strong className={css.errorCode}>{code}</strong>
      <p className={css.errorMessage}>
        작업 진행 중, 에러가 발생했어요.
        <br />
        에러 메시지: {message}
      </p>
      <div className={css.buttonConsole}>
        <Link className={css.navigateButton} to="/">
          return to the home
        </Link>
      </div>
    </section>
  );
}
