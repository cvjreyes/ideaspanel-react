/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useContext } from "react";

import { AiOutlinePoweroff, AiOutlineUser } from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <div css={navbarStyle}>
        <div className="container">
          <div className="menu">
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? { color: "white" } : null)}
            >
              Home
            </NavLink>
            {user.isComittee ? (
              <NavLink
                to="/comittee"
                style={({ isActive }) => (isActive ? { color: "white" } : null)}
              >
                Comittee
              </NavLink>
            ) : null}
            <NavLink
              to="/new_idea"
              style={({ isActive }) => (isActive ? { color: "white" } : null)}
              className="buttonLink"
            >
              New Idea
              <IoMdCreate />
            </NavLink>
          </div>
          <div />
          <div className="profileBox">
            <NavLink
              to={`/profile/${user.id}/Published`}
              className="buttonLink"
            >
              {user.name}
              <AiOutlineUser />
            </NavLink>
            <AiOutlinePoweroff onClick={logout} className="logoutButton" />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

const navbarStyle = {
  zIndex: 1000,
  width: "100%",
  backgroundColor: "#0054B3",
  color: "#C3C3C3",
  position: "fixed",
  top: 0,
  ".container":{
    maxWidth:"100rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "50px",
    padding: " 0 5vw",
    margin:"auto"
  },
  a: {
    transition: "color 0.2s ease-in-out",
    ":hover": {
      color: "lightgray",
    },
  },
  img: {
    transition: "filter 0.2s ease-in-out",
    width: "30px",
    margin: "0 0 0 .5rem",
  },
  ".menu": {
    display: "flex",
    gap: "1.1rem",
    alignItems: "center",
  },
  ".profileBox": {
    display: "flex",
    gap: "1.1rem",
    alignItems: "center",
    color: "white",
    ".logout": {
      height: "25px",
      width: "25px",
      marginLeft: "20px",
      ":hover": {
        filter: "invert(20%)",
      },
    },
  },
  ".buttonLink": {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  ".logoutButton": {
    cursor: "pointer",
    ":hover": {
      filter: "invert(20%)",
    },
  },
};
