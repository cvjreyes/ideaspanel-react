/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Input({
  id,
  name,
  value,
  defaultValue,
  type,
  onChange,
  className,
  placeholder,
  margin,
  width,
  onFocus,
  onKeyDown,
  onBlur,
  padding,
  textAlign,
}) {
  const InputStyle = {
    height: "40px",
    border: "1px solid #D2D2D2",
    borderRadius: "6px",
    padding: padding || "10px",
    textAlign: textAlign || "left",
    margin,
    width,
  };
  return (
    <input
      css={InputStyle}
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      type={type}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
}
