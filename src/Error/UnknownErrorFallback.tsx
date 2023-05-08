import { useErrorBoundary } from "react-error-boundary";
import { Error } from ".";

export function UnknownErrorFallback({ error }: { error: Error }) {
  const { resetBoundary } = useErrorBoundary();

  return <Error onResetError={resetBoundary} />;
}
