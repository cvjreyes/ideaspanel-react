/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function NoComittee() {
  return <div css={noComitteeStyle}>❌ You are not Comittee...</div>;
}

const noComitteeStyle = {
  textAlign: "center",
  marginTop: "100px",
};
