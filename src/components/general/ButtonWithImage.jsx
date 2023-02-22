/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function ButtonWithImage({
  name,
  text,
  onClick,
  bgColor,
  color,
  border,
  borderRadius,
  width,
  height,
  margin,
  className,
  fontWeight,
  fontSize,
  type,
  padding,
  bgHover,
  textMargin,
  hoverShadow,
  src,
  alt,
  imgFilter,
  imgWidth,
}) {
  const buttonStyle = {
    width: width || "100%",
    height,
    padding: padding || "10px 20px",
    background: bgColor,
    border,
    borderRadius: borderRadius || "6px",
    margin,
    fontWeight,
    ":hover": {
      background: bgHover,
      boxShadow: hoverShadow,
    },
    span: { whiteSpace: "nowrap", color, fontSize, margin: textMargin },
    img: {
      width: imgWidth || "20px",
      filter: imgFilter,
    },
  };

  return (
    <button
      type={type}
      className={`${className} pointer flexCenter`}
      css={buttonStyle}
      onClick={onClick}
      name={name}
    >
      <img src={src} alt={alt} />
      <span>{text}</span>
    </button>
  );
}