/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";

export default function NoComments() {
  return <div css={noCommentsStyle}>❌ No comments yet...</div>;
}

const shake = keyframes`
0% { transform: translateX(0); }
20% { transform: translateX(-10px); }
40% { transform: translateX(10px); }
60% { transform: translateX(-10px); }
80% { transform: translateX(10px); }
100% { transform: translateX(0); }
`;

const noCommentsStyle = {
  textAlign: "center",
  marginTop: "100px",
  fontSize: "18px",
  animation: `${shake} 1s ease`,
};
