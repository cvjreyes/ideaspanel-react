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
  display: "flex",
  justifyContent: "center",
  margin: "50px 0 0",
  ".technipLogo": {
    width: "120px",
  },
};
