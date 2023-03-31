/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import TechnipLogo from "../../assets/images/technip.png";

export default function Footer() {
  return (
    <div css={footerStyle}>
      <img src={TechnipLogo} alt="technip" className="technipLogo" />
    </div>
  );
}

const footerStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  height: "100px",
  width: "100%",
  padding: "20px",
  boxSizing: "border-box",
  ".technipLogo": {
    width: "120px",
  },
};
