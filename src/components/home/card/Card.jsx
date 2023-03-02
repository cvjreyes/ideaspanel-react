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

  function clickCard() {
    navigate(`/idea/${item.id}`);
  }

  function clickProfile() {
    navigate(`/profile/${item.user_id}`);
  }

  return (
    <div css={cardStyle}>
      <div onClick={() => clickCard()}>
        {item.image ? (
          <img src={item.image} alt="idea" />
        ) : (
          <div className="noImageIdea"></div>
        )}
        <div className="boxCard">
          <p className="bold">{item.title}</p>
          <p>{item.description}</p>
        </div>
      </div>
      <div
        className="profileBox"
        onClick={() => {
          if (!item.anonymous) clickProfile();
        }}
      >
        <div>
          <img src={item.profile_pic} alt="profile" className="profileImage" />
        </div>
        <div className="infoProfile">
          {!item.anonymous ? (
            <span className="bold">{item.name}</span>
          ) : (
            <span className="bold">Anonymous</span>
          )}
          <span className="date">{displayDate}</span>
          {daysPassed != 0 ? (
            <span className="bold">{daysPassed} day/s ago</span>
          ) : (
            <span className="bold">Today</span>
          )}
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  borderRadius: "40px",
  border: "0 solid black",
  background: "white",
  margin: "50px",
  minHeight: "500px",
  minWidth: "350px",
  cursor: "pointer",
  boxShadow: "0 10px 10px -1px rgb(133, 133, 133)",
  img: {
    borderRadius: "10% 10% 0 0",
    objectFit: "cover",
    width: "100%",
    height: "200px",
  },
  ".noImageIdea": {
    height: "200px",
  },
  ".boxCard": {
    padding: "30px",
    height: "170px",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  ".profileBox": {
    padding: "10px",
    minHeight: "10vh",
    width: "330px",
    display: "flex",
    alignItems: "center",
    margin: "10px",
    fontStyle: "italic",
    ".infoProfile": {
      display: "flex",
      flexDirection: "column",
      marginLeft: "10px",
    },
    ".profileImage": {
      height: "60px",
      background: "linear-gradient(300deg, #e6e6e6, #ffffff)",
      borderRadius: "50%",
    },
    ":hover": {
      borderRadius: "10px",
      background: "linear-gradient(300deg, #e6e6e6, #ffffff)",
    },
    ".line": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      padding: "10px",
    },
  },
};
