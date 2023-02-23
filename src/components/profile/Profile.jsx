/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Profile() {
  return <div css={profileStyle}>Profile</div>;
}

const profileStyle = {
  marginTop: "50px",
  minHeight: "calc(100vh - 50px)",
};
