/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { ProfileInfo } from "../../general/ProfileInfo";
import { Link } from "wouter";
import { BsImage, BsCheck } from "react-icons/bs";

function IdeaCard({ info, navigateTo, comittee }) {
  const { description, title, image, name, approved } = info;
  return (
    <Link to={navigateTo} css={ideaCard}>
      <div className="imageContainer">
        {image ? (
          <img className="image" src={image} />
        ) : (
          <BsImage className="noImage" />
        )}
      </div>
      <div className="content">
        <h3 className="title">{title}</h3>
        <p className="text">{description}</p>
        {name && <ProfileInfo profile={info} />}
      </div>
      {comittee && <div className={`statusTag statusTag--${approved ? "approved" : "denied"}`} />}
    </Link>
  );
}

const ideaCard = {
  position: "relative",
  border: "1px solid #C3C3C3",
  borderRadius: "10px",
  backgroundColor: "#F8F8F8",
  overflow: "hidden",
  transition: "ease 0.3s all",
  ":hover": {
    borderColor: "#7E7E7E",
    backgroundColor: "#f2f2f2",
  },
  ".imageContainer": {
    aspectRatio: "7/4",
    backgroundColor: "#C3C3C3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ".image": {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  ".noImage": {
    fontSize: "3rem",
    color: "#7E7E7E",
  },
  ".content": {
    padding: "1rem",
  },
  ".title": {
    fontSize: "1rem",
    marginBottom: "0.3rem",
  },
  ".text": {
    display: "-webkit-box",
    color: "#7E7E7E",
    " -webkit-line-clamp": 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    marginBottom: "1rem",
  },
  ".statusTag": {
    position: "absolute",
    top: 0,
    right: 0,
    width: 0,
    borderTop: 0,
    borderLeft: "6rem solid transparent",
    borderBottom: "6rem solid transparent",
  },
  ".statusTag--approved":{
    borderRight: "6rem solid #76A84Ea6",
  },
  ".statusTag--denied":{
    borderRight: "6rem solid #E44545a6",
  }
};

export { IdeaCard };
