/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function NoResults() {

  return (
    <div css={noResultsStyle}>
      <p>No results found</p>
    </div>
  );
}
const noResultsStyle = {
  height:"100%",
  display:"flex",
  gap:"1rem",
  flexDirection:"column",
  alignItems:"center",
  justifyContent:"center"
};
