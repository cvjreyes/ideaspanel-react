/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function NoResults() {
  return <div css={noResultsStyle}>❌ No ideas yet...</div>;
}

const noResultsStyle = {
  textAlign: "center",
  marginTop: "100px",
};
