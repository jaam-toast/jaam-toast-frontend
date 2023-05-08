import { Navigate } from "react-router-dom";

export function ValidationErrorFallback({ error }: { error: Error }) {
  return <Navigate to="/error" state={{ code: 404 }} />;
}
