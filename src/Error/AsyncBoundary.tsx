import { ReactElement, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import axios from "axios";

import { ValidationError } from "../@utils/createError";
import { HttpErrorFallback } from "./HttpErrorFallback";
import { UnknownErrorFallback } from "./UnknownErrorFallback";
import { ValidationErrorFallback } from "./ValidationErrorFallback";
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

  if (error instanceof ValidationError) {
    return <ValidationErrorFallback error={error} />;
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
  console.log("에러");
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
