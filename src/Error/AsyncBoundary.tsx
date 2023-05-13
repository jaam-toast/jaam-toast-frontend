import { ReactElement, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import axios from "axios";

import { NotFoundError } from "../@utils/createError";
import { HttpErrorFallback } from "./HttpErrorFallback";
import { UnknownErrorFallback } from "./UnknownErrorFallback";
import { Error } from ".";

import type { AxiosError } from "axios";

type ErrorFallbackProps = {
  error: Error | AxiosError;
};

type AsyncBoundaryProps = {
  suspenseFallback: ReactElement;
  errorFallback?: ReactElement;
  children: ReactElement;
};

function ErrorFallback({ error }: ErrorFallbackProps) {
  if (axios.isAxiosError(error)) {
    return <HttpErrorFallback error={error} />;
  }

  if (error instanceof NotFoundError) {
    return (
      <Navigate to="/error" state={{ code: 404, message: error.message }} />
    );
  }

  if (error instanceof ReferenceError) {
    return <Error code="Reference error" message={error.message} />;
  }

  return <UnknownErrorFallback error={error} />;
}

export function AsyncBoundary({
  suspenseFallback,
  errorFallback,
  children,
}: AsyncBoundaryProps) {
  return (
    <>
      {errorFallback ? (
        <ErrorBoundary fallback={errorFallback}>
          <Suspense fallback={suspenseFallback}>{children}</Suspense>
        </ErrorBoundary>
      ) : (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={suspenseFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </>
  );
}
