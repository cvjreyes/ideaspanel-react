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
  top: 50,
  display: "flex",
  justifyContent: "flex-start",
  height: "110px",
  width: "10%",
  padding: "20px",
  boxSizing: "border-box",
  ".technipLogo": {
    width: "120px",
  },
};
