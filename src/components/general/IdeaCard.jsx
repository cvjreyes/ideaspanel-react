/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import moment from "moment/moment";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

import { ProfileInfo } from "./ProfileInfo";

function IdeaCard({ idea, navigateTo, comittee, home }) {
  const {
    description,
    title,
    image,
    approved,
    like_count,
    comment_count,
    published_at,
    user_id,
  } = idea;

  let publishedDate = new Date(published_at);

  const navigate = useNavigate();

  const handleCardClick = (e) => {
    e.preventDefault();
      navigate(`/profile/${user_id}/Published`);
    
  };

  return (
    <Link to={navigateTo} css={ideaCard}>
      <div className="imageContainer">
        {image ? (
          <img className="image" src={image} />
        ) : (
          <BsImage className="noImage" />
        )}
      </div>
      <div className="card__content">
        <header className="card__header">
          <h3 className="title">{title}</h3>
          {home && (
            <div className="card__actions">
              <div>
                <AiOutlineLike /> {like_count}
              </div>
              <div>
                <AiOutlineComment /> {comment_count}
              </div>
            </div>
          )}
        </header>
        <p className="text">{description}</p>

        {home && (
          <>
            <div onClick={handleCardClick} className="profileLink">
              <ProfileInfo profile={idea} />
            </div>
            <footer className="card__footer">
              {moment(publishedDate, "YYYYMMDD").fromNow()}
            </footer>
          </>
        )}
      </div>
      {comittee && (
        <div
          className={`statusTag statusTag--${
            approved === 1 ? "approved" : approved === 0 ? "denied" : ""
          }`}
        />
      )}
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
  display: "flex",
  flexDirection: "column",
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
    flexShrink: 0,
    overflow: "hidden",
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
  ".card__content": {
    padding: "1.1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    flexGrow: 1,
  },
  ".card__header": {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  ".card__actions": {
    display: "flex",
    gap: "0.8rem",
    fontSize: "1.2rem",
    flexShrink: 0,
  },
  ".card__footer": {
    color: "#7E7E7E",
    textAlign: "right",
    justifyContent: "flex-end",
  },
  ".title": {
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  ".text": {
    display: "-webkit-box",
    color: "#7E7E7E",
    " -webkit-line-clamp": 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    marginBottom: "auto",
  },
  ".profileLink": {
    transition: "ease 0.3s background-color",
    borderRadius: "5px",
  },
  ".profileLink:hover": {
    backgroundColor: "#E3EBF5",
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
  ".statusTag--approved": {
    borderRight: "6rem solid #76A84Ea6",
    "&::before": {
      // Agrega este bloque para mostrar el tick en "approved"
      content: "'\\2713'", // Código unicode para el tick
      position: "absolute",
      top: "10px",
      right: "-80px",
      fontWeight: "bold",
      color: "white",
      fontSize: "23px",
    },
  },
  ".statusTag--denied": {
    borderRight: "6rem solid #E44545a6",
    "&::before": {
      // Agrega este bloque para mostrar la "x" en "denied"
      content: "'\\2716'", // Código unicode para la "x"
      position: "absolute",
      top: "10px",
      right: "-80px",
      color: "white",
      fontSize: "21px",
    },
  },
};

export { IdeaCard };
