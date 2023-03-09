/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useLocation } from "wouter";

export default function Card({ item }) {
  const [__, navigate] = useLocation();

  const createdDate = new Date(item.created_at);
  const actualDate = new Date();
  const daysPassed = (
    (actualDate - createdDate) /
    1000 /
    60 /
    60 /
    24
  ).toFixed();
  const displayDate =
    createdDate.getDate() +
    "/" +
    (createdDate.getMonth() + 1) +
    "/" +
    createdDate.getFullYear();
  return (
    <div css={cardStyle}>
      <div onClick={() => navigate(`/idea/${item.id}`)}>
        <img
          src={item.image || "http://localhost:5026/images/no_image.jpg"}
          alt="idea"
          className="ideaImage"
        />
        <div className="boxCard">
          <p className="title cutLines bold">{item.title}</p>
          <p className="description cutLines">{item.description}</p>
        </div>
      </div>
      <div
        className="profileBox"
        onClick={() => !item.anonymous && navigate(`/profile/${item.user_id}`)}
      >
        <img
          src={
            !item.anonymous
              ? item.profile_pic
              : "http://localhost:5026/images/default.png"
          }
          alt="profile"
        />
        <div className="infoProfile">
          <span className="semiBold italic medium">
            {!item.anonymous ? item.name : "Anonymous"}
          </span>
          <span className="date italic medium">{displayDate}</span>
          {daysPassed != 0 ? (
            <span className="semiBold italic medium">
              {daysPassed} day/s ago
            </span>
          ) : (
            <span className="semiBold italic medium">Today</span>
          )}
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  borderRadius: "20px",
  border: "0 solid black",
  background: "white",
  margin: "0 50px 50px 0",
  lineHeight: "1.5rem",
  cursor: "pointer",
  boxShadow: "8px 8px 17px #e4e5da, -8px -8px 17px #ffffff",
  transition: "all 200ms linear",
  top: 0,
  position: "relative",
  ":hover": {
    boxShadow: "12px 12px 24px #e4e5da, -12px -12px 24px #ffffff",
    top: -5,
  },
  ".ideaImage": {
    objectFit: "cover",
    width: "100%",
    height: "200px",
    borderRadius: "20px 20px 0 0",
  },
  ".boxCard": {
    padding: "30px",
    height: "170px",
    ".title": {
      WebkitLineClamp: 1,
    },
    ".description": {
      WebkitLineClamp: 5,
    },
  },
  ".profileBox": {
    margin: "20px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    ":hover": {
      borderRadius: "10px",
      background: "linear-gradient(300deg, #f9f9f9, #ffffff)",
    },
    img: {
      width: "60px",
      height: "60px",
      padding: "10px",
      backgroundColor: "#99C6F8",
      borderRadius: "100px",
      objectFit: "cover",
    },
    ".infoProfile": {
      display: "flex",
      flexDirection: "column",
      marginLeft: "10px",
      lineHeight: "1.2rem",
    },
  },
};
