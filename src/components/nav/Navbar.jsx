/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext } from "react";
import { Link } from "wouter";

import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <div css={navbarStyle}>
      <div className="left">
        <Link to="/ideas_panel/">Home</Link>
        <Link to="/ideas_panel/comittee">Comittee</Link>
        <Link to="/ideas_panel/new_idea" className="flexCenter">
          New Idea
          <img
            alt="new"
            src="https://img.icons8.com/external-others-amoghdesign/24/null/external-write-multimedia-solid-24px-others-amoghdesign.png"
            className="invert pointer"
          />
        </Link>
      </div>
      <div className="right">
        <Link to={`/ideas_panel/profile/${user.id}`} className="flexCenter">
          <span>{user.name}</span>
          <img
            tabIndex={0}
            className="pointer invert"
            alt="user"
            src="https://img.icons8.com/ios-glyphs/30/null/user--v1.png"
          />
        </Link>
      </div>
    </div>
  );
}

const navbarStyle = {
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
    },
  },
  img: {
    transition: "filter 0.2s ease-in-out",
    width: "30px",
    margin: "0 0 0 .5rem",
    // ":hover": {
    //   filter: "invert(70%)",
    //   webkitFilter: "invert(70%)",
    // },
  },
  ".left": {
    display: "flex",
    alignItems: "center",
    a: {
      margin: "0 2rem 0 0",
    },
  },
  ".right": {
    // display: "flex",
    // alignItems: "center",
  },
};
