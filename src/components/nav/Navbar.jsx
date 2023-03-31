/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext } from "react";
import { Link, useRoute } from "wouter";

import { AuthContext } from "../../context/AuthContext";
import LogoutImg from "../../assets/images/logout.png";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const [isHomeActive] = useRoute("/ideas_panel/");
  const [isComitteeActive] = useRoute("/ideas_panel/comittee");
  const [isComitteeActive2] = useRoute("/ideas_panel/comittee/manage");
  const [isNewIdeaActive] = useRoute("/ideas_panel/new_idea");
  const [isProfileActive] = useRoute("/ideas_panel/profile/:id");

  return (
    <div css={navbarStyle}>
      <div className="left">
        <Link
          to="/ideas_panel/"
          className={isHomeActive ? "active" : ""}
          style={{ width: "79px" }}
        >
          Home
        </Link>
        {user.isComittee ? (
          <Link
            to="/ideas_panel/comittee"
            className={isComitteeActive || isComitteeActive2 ? "active" : ""}
            style={{ width: "100px" }}
          >
            Comittee
          </Link>
        ) : null}
        <Link
          to="/ideas_panel/new_idea"
          className={`flexCenter ${isNewIdeaActive ? "active" : ""}`}
          style={{ width: "120px" }}
        >
          New Idea
          <img
            alt="new"
            src="https://img.icons8.com/external-others-amoghdesign/24/null/external-write-multimedia-solid-24px-others-amoghdesign.png"
            className="invert pointer"
          />
        </Link>
      </div>
      <div />
      <div className="profileBox">
        <Link to={`/ideas_panel/profile/${user.id}`} className="flexCenter">
          {user.name}
          <img
            tabIndex={0}
            className="pointer invert"
            alt="user"
            src="https://img.icons8.com/ios-glyphs/30/null/user--v1.png"
          />
        </Link>
        <img onClick={logout} src={LogoutImg} className="pointer logout" />
      </div>
    </div>
  );
}

const navbarStyle = {
  zIndex: 1000,
  height: "50px",
  width: "100vw",
  backgroundColor: "#0054B3",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 5vw",
  position: "fixed",
  top: 0,
  span: {
    color: "white",
  },
  a: {
    color: "white",
    transition: "color 0.2s ease-in-out",
    ":hover": {
      color: "lightgray",
      img: {
        filter: "invert(70%)",
        webkitFilter: "invert(70%)",
      },
    },
  },
  img: {
    transition: "filter 0.2s ease-in-out",
    width: "30px",
    margin: "0 0 0 .5rem",
  },
  ".left": {
    display: "flex",
    alignItems: "center",
  },
  ".profileBox": {
    display: "flex",
    alignItems:"center",
    ".logout": {
      height:"25px",
      width:"25px",
      marginLeft:"20px",
      ":hover":{
        filter: "invert(20%)",
      }
    }
  },
};
