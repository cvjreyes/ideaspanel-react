/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useErrorBoundary } from "react-error-boundary";

export default function ErrorFallback({ error }) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div role="alert" css={errorFallBackStyles}>
      <div className="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
        <button onClick={resetBoundary}>Try again</button>
      </div>
    </div>
  );
}

const errorFallBackStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  alert: {
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
    color: "#721c24",
    padding: "1rem",
    textAlign: "center",
    width: "90%",
    maxWidth: "500px",
  },
};
