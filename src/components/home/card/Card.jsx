/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Card({ data }) {
  return (
    <div css={cardStyle}>
      {data.map((data) => {
        return (
          <div className="boxCard" key={data.name}>
            <div className="image">
              {data.anonymous === "false" ? (
                <img src={data.image} alt={data.name} />
              ) : (
                <div style={{ marginTop: "30px" }}></div>
              )}
            </div>
            <div className="line">
              <label className="bold">Name: </label>
              {data.anonymous === "false" ? data.name : "Anonymous"}
            </div>
            <div className="line">
              <label className="bold">Description: </label>
              {data.description}
            </div>
            <div className="line">
              <label className="bold">Date of publishing: </label>
              {data.dateofpublishing}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const cardStyle = {
  display: "flex",
  height: "80vh",
  flexDirection: "row",
  alignItems: "flex-start",
  // padding: "10px",
  flexWrap: "wrap",
  margin: "0 100px",
  overflowY: "auto",
  /* Hide scrollbar for IE, Edge and Firefox */
  msOverflowStyle: "none" /* IE and Edge */,
  scrollbarWidth: "none" /* Firefox */,
  /* Hide scrollbar for Chrome, Safari and Opera */
  "::-webkit-scrollbar": {
    display: "none",
  },
  ".boxCard": {
    borderRadius: "10px",
    border: "1px solid black",
    padding: "0 30px 30px 30px",
    background:
      "linear-gradient(90deg, rgba(162,208,219,1) 0%, rgba(161,204,219,1) 59%, rgba(176,208,222,1) 100%)",
    margin: "30px",
    width: "20%",
    height: "35vh",
    overflowY: "auto",
    /* Hide scrollbar for IE, Edge and Firefox */
    msOverflowStyle: "none" /* IE and Edge */,
    scrollbarWidth: "none" /* Firefox */,
    /* Hide scrollbar for Chrome, Safari and Opera */
    "::-webkit-scrollbar": {
      display: "none",
    },
    boxShadow: "0 40px 40px -4px lightblue",
    img: {
      height: "150px",
      width: "150px",
    },
    ".image": {
      display: "flex",
      justifyContent: "center",
    },
    ".line": {
      padding: "3px",
    },
  },
};
