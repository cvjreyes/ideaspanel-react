/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";

export default function NoResults() {
  return <div css={noResultsStyle}>❌ No ideas yet...</div>;
}
const shake = keyframes`
0% { transform: translateX(0); }
20% { transform: translateX(-10px); }
40% { transform: translateX(10px); }
60% { transform: translateX(-10px); }
80% { transform: translateX(10px); }
100% { transform: translateX(0); }
`;

const noResultsStyle = {
  textAlign: "center",
  marginTop: "100px",
  fontSize: "20px",
  animation: `${shake} 1s ease`,
};

