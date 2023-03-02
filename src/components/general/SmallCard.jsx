/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useLocation } from "wouter";

export default function SmallCard({ item }) {
  const [__, navigate] = useLocation();

  const createdDate = new Date(item.created_at);
  const displayDate =
    createdDate.getDate() +
    "/" +
    (createdDate.getMonth() + 1) +
    "/" +
    createdDate.getFullYear();

  return (
    <div
      css={cardStyle}
      onClick={() => navigate(`/profile/edit_idea/${item.id}`)}
    >
      <div>
        {item.image ? (
          <img src={item.image} alt="idea" />
        ) : (
          <div className="noImageIdea"></div>
        )}
        <div className="boxCard">
          <p className="title bold">{item.title}</p>
          <p className="description">{item.description}</p>
        </div>
      </div>
      <div className="profileBox">
        <div className="infoProfile">
          <span className="date">{displayDate}</span>
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
  minHeight: "150px",
  minWidth: "250px",
  cursor: "pointer",
  boxShadow: "0 10px 10px -1px rgb(133, 133, 133)",
  img: {
    borderRadius: "10% 10% 0 0",
    objectFit: "cover",
    width: "100%",
    height: "130px",
  },
  ".noImageIdea": {
    height: "130px",
  },
  ".boxCard": {
    padding: "30px",
    height: "50px",
  },
  ".description": {
    fontSize:"12px",
    display: "-webkit-box",
    textOverflow: "ellipsis",
    overflow: "hidden",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  },
  ".title": {
    display: "-webkit-box",
    textOverflow: "ellipsis",
    overflow: "hidden",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    fontSize:"13px",
  },
  ".profileBox": {
    padding: "10px",
    minHeight: "7vh",
    width: "230px",
    display: "flex",
    alignItems: "center",
    margin: "10px 10px 0 10px",
    fontStyle: "italic",
    ".infoProfile": {
      display: "flex",
      flexDirection: "column",
      marginLeft: "10px",
      ".date":{
        fontSize:"14px",
      },
    },
    ".line": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      padding: "10px",
    },
  },
};
