/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Button({
  name,
  text,
  onClick,
  bgColor,
  color,
  border,
  borderRadius,
  width,
  margin,
  className,
  fontWeight,
  fontSize,
  type,
  padding,
  bgHover,
  display,
  disabled,
}) {
  const buttonStyle = {
    width: width || "100%",
    padding: padding || "10px 20px",
    background: disabled ? "lightgray" : bgColor,
    color,
    border: border || "1px solid lightgray",
    borderColor: disabled && "lightgray",
    borderRadius: borderRadius || "6px",
    margin,
    fontWeight,
    fontSize,
    ":hover": {
      background: disabled ? "auto" : bgHover,
    },
    display: display,
  };

  return (
    <button
      type={type}
      className={`${className} ${disabled ? "not-allowed" : "pointer"}`}
      css={buttonStyle}
      onClick={onClick}
      name={name}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
