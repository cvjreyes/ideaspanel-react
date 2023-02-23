/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function NewPost() {
  return <div css={newpostStyle}>NewPost</div>;
}

const newpostStyle = {
  marginTop: "50px",
  minHeight: "calc(100vh - 50px)",
};
