/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Input({
  id,
  name,
  value,
  type,
  onChange,
  className,
  placeholder,
  margin,
}) {
  const InputStyle = {
    height: "40px",
    border: "1px solid #D2D2D2",
    borderRadius: "6px",
    padding: "5px",
    margin,
  };
  return (
    <input
      css={InputStyle}
      id={id}
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
    />
  );
}
