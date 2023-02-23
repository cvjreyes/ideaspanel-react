/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function NewPost() {
  return (
    <div css={newpostStyle}>
      <h1>New Post</h1>
    </div>
  );
}

const newpostStyle = {
  marginTop: "50px",
  minHeight: "calc(100vh - 50px)",
  textAlign: "center",
  h1: {
    fontSize: "24px",
    marginTop: "100px",
  },
};
