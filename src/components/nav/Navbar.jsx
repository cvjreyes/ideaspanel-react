/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext } from "react";

import { AiOutlinePoweroff, AiOutlineUser } from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
  
export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <div css={navbarStyle}>
        <div className="left">
          <Link to="/">Home</Link>
          {user.isComittee ? (
            <Link to="/comittee">Comittee</Link>
          ) : null}
          <Link to="/new_idea">
            New Idea
            <IoMdCreate />
          </Link>
        </div>
        <div />
        <div className="profileBox">
          <Link
            to={`/profile/${user.id}/Published`}
            className="flexCenter"
          >
            {user.name}
            <AiOutlineUser />
          </Link>
          <button onClick={logout}>
            <AiOutlinePoweroff />
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

const navbarStyle = {
  zIndex: 1000,
  height: "50px",
  width: "100vw",
  backgroundColor: "#0054B3",
  color: "#C3C3C3",
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
    alignItems: "center",
    ".logout": {
      height: "25px",
      width: "25px",
      marginLeft: "20px",
      ":hover": {
        filter: "invert(20%)",
      },
    },
  },
};
