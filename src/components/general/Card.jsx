/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useLocation } from "wouter";
import { formatDate } from "../../helpers/time";

export default function Card({ item, comittee }) {
  const [__, navigate] = useLocation();

  const cardStyle = {
    margin: !comittee ? "0 50px 50px 0" : "30px auto 50px",
    width: "380px",
    borderRadius: "20px",
    border: "0 solid black",
    paddingBottom: "1px",
    background: "white",
    lineHeight: "1.5rem",
    boxShadow: "8px 8px 17px #e4e5da, -8px -8px 17px #ffffff",
    transition: "all 200ms linear",
    top: 0,
    position: "relative",
    ":hover": {
      boxShadow:
        !comittee && "12px 12px 24px #e4e5da, -12px -12px 24px #ffffff",
      top: !comittee && -5,
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

  return (
    <div css={cardStyle} className={!comittee && "pointer"}>
      <div onClick={() => !comittee && navigate(`/idea/${item.id}`)}>
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
          <span className="date italic medium">
            {formatDate(item.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
}
