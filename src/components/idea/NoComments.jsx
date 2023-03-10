/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function NoComments() {
  return <div css={noCommentsStyle}>❌ No comments yet...</div>;
}

const noCommentsStyle = {
  textAlign: "center",
  marginTop: "100px",
};