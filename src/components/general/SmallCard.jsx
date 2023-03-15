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
      className="pointer"
    >
      <img
        src={item.image || "http://localhost:5026/images/no_image.jpg"}
        alt="idea"
      />
      <div className="boxCard">
        <p className="title bold">{item.title}</p>
        <p className="description">{item.description}</p>
        <p className="date italic">{displayDate}</p>
      </div>
    </div>
  );
}

const cardStyle = {
  borderRadius: "20px",
  background: "white",
  margin: "0 0 30px 0",
  minHeight: "233px",
  boxShadow: "8px 8px 17px #e4e5da, -8px -8px 17px #ffffff",
  transition: "all 200ms linear",
  top: 0,
  position: "relative",
  ":hover": {
    boxShadow: "12px 12px 24px #e4e5da, -12px -12px 24px #ffffff",
    top: -5,
  },
  img: {
    borderRadius: "20px 20px 0 0",
    objectFit: "cover",
    width: "100%",
    height: "130px",
  },
  ".boxCard": {
    padding: "15px 20px",
    ".title": {
      display: "-webkit-box",
      textOverflow: "ellipsis",
      overflow: "hidden",
      WebkitLineClamp: "1",
      WebkitBoxOrient: "vertical",
      fontSize: "13px",
    },
    ".description": {
      fontSize: "12px",
      display: "-webkit-box",
      textOverflow: "ellipsis",
      overflow: "hidden",
      WebkitLineClamp: "2",
      WebkitBoxOrient: "vertical",
    },
    ".date": {
      marginTop: "10px",
      fontSize: "10px",
    },
  },
};
