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
  blend,
  imgFilter,
  imgWidth,
}) {
  const buttonStyle = {
    width: width || "150px",
    height,
    padding: padding || "15px",
    background: bgColor,
    border: border || "none",
    borderRadius: borderRadius || "6px",
    margin,
    fontWeight,
    ":hover": {
      background: bgHover,
      boxShadow: hoverShadow,
    },
    span: { whiteSpace: "nowrap", color, fontSize, margin: textMargin },
    div: {
      width: imgWidth || "20px",
      height: imgWidth || "20px",
      backgroundImage: `url(${src})`,
      backgroundSize: "100%",
      mixBlendMode: blend && "screen",
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
      <div />
      <span>{text}</span>
    </button>
  );
}
