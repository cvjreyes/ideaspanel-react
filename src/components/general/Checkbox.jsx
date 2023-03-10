/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Checkbox({ checked, onChange, className }) {
  const checkboxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    ".input": {
      appearance: "none",
      width: "1.25rem",
      height: "1.25rem",
      border: "1px solid #ccc",
      borderRadius: "0.25rem",
      backgroundColor: `${checked ? "#3182CE" : "transparent"}`,
      transition: "background-color 0.2s ease-in-out",
      ":hover": {
        backgroundColor: `${checked ? "#3182CE" : "#E2E8F0"}`,
      },
      ":focus": {
        outline: "none",
        boxShadow: "0 0 0 2px rgba(49, 130, 206, 0.5)",
      },
      ":checked": {
        backgroundColor: "#3182fa",
      },
    },
  };
  return (
    <div css={checkboxStyle} className="pointer" onClick={onChange}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`input ${className}`}
      />
    </div>
  );
}
