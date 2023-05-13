import { Navigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";

import { Error } from ".";
import { HttpError } from "../@utils/createError";

import type { AxiosError } from "axios";

export function HttpErrorFallback({ error }: { error: AxiosError }) {
  const { resetBoundary } = useErrorBoundary();

  if (!error.response) {
    /**
     * network error
     */
    return <Error code="Network Error" onResetError={resetBoundary} />;
  }

  const { status } = error.response;

  if (status === 401) {
    return <Navigate to="/" />;
  }

  if (status === 404) {
    return <Navigate to="/error" state={{ code: 404 }} />;
  }

  if (status >= 500) {
    return <Navigate to="/error" />;
  }

  return (
    <Error
      code={error.response.status}
      onResetError={resetBoundary}
      message={new HttpError(error).message}
    />
  );
}
