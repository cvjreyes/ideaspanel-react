/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div css={loadingStyle}>
      <ReactLoading
        type={"cylon"}
        color={"rgb(53, 126, 221)"}
        height={100}
        width={100}
      />
    </div>
  );
}

const loadingStyle = {
  width: "100%",
  minHeight: "calc(100vh - 50px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
