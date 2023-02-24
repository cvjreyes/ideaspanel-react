/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Card({ item }) {
  return (
    <div css={cardStyle}>
      <div className="boxCard" key={item.name}>
        <div className="image">
          {item.anonymous === "false" ? (
            <img src={item.image} alt={item.name} />
          ) : (
            <div style={{ marginTop: "30px" }}></div>
          )}
        </div>
        <div className="line">
          <p className="bold">Name: </p>
          <span>{!item.anonymous ? item.name : "Anonymous"}</span>
        </div>
        <div className="line">
          <p className="bold">Description: </p>
          <span>{item.description}</span>
        </div>
        <div className="line">
          <p className="bold">Date of publishing: </p>
          <span>{item.dateofpublishing}</span>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  borderRadius: "10px",
  border: "1px solid black",
  padding: "0 30px 30px 30px",
  background:
    "linear-gradient(90deg, rgba(162,208,219,1) 0%, rgba(161,204,219,1) 59%, rgba(176,208,222,1) 100%)",
  margin: "30px",
  height: "35vh",
  overflowY: "auto",
  /* Hide scrollbar for IE, Edge and Firefox */
  msOverflowStyle: "none" /* IE and Edge */,
  scrollbarWidth: "none" /* Firefox */,
  /* Hide scrollbar for Chrome, Safari and Opera */
  "::-webkit-scrollbar": {
    display: "none",
  },
  boxShadow: "0 10px 10px -1px lightblue",
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
};
