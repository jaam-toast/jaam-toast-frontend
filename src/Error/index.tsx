import { Link } from "react-router-dom";
import * as css from "./index.css";
import { NotFound } from "./NotFound";

export function Error({
  code = 500,
  message = "An unknown error has occurred.",
  onResetError,
}: {
  code?: number | string;
  message?: string;
  isNetworkError?: boolean;
  onResetError?: () => void;
}) {
  if (code === 404) {
    return <NotFound />;
  }

  return (
    <section className={css.container}>
      <strong
        className={
          typeof code === "number" ? css.errorCode : css.errorCodeSmall
        }
      >
        {code}
      </strong>
      <p className={css.errorMessage}>
        An error occurred during the operation.
        <br />
        Error Message: {message}
      </p>
      <div className={css.buttonConsole}>
        <Link className={css.navigateButton} to="/">
          Return to the home
        </Link>
        {!!onResetError && (
          <div onClick={onResetError} className={css.navigateButton}>
            Retry
          </div>
        )}
      </div>
    </section>
  );
}
