/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import ReactLoading from "react-loading";

export default function Loading({ size }) {
  if (size === "small")
    return (
      <div css={smallLoadingStyle}>
        <ReactLoading
          type={"cylon"}
          color={"rgb(53, 126, 221)"}
          height={50}
          width={50}
        />
      </div>
    );
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

const smallLoadingStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "50px",
};

const loadingStyle = {
  width: "100%",
  minHeight: "calc(100vh - 50px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
