/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useContext } from "react";
import { IoMdCreate } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ProfileDropdown } from "./ProfileDropdown";

export default function Navbar() {
  const { user } = useContext(AuthContext);

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
          <ProfileDropdown />
        </div>
      </div>
      <Outlet />
    </>
  );
}

const navbarStyle = {
  ".a": {
    backgroundColor: "red",
  },
  zIndex: 10,
  width: "100%",
  backgroundColor: "#0054B3",
  color: "#C3C3C3",
  position: "fixed",
  top: 0,
  ".container": {
    maxWidth: "100rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "50px",
    padding: " 0 5vw",
    margin: "auto",
  },
  a: {
    transition: "color 0.2s ease-in-out",
    ":hover": {
      color: "lightgray",
    },
  },
  ".menu": {
    display: "flex",
    gap: "1.1rem",
    alignItems: "center",
  },
  ".buttonLink": {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  ".dropdownTrigger": {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    cursor: "pointer",
    color: "white",
    ".imgContainer": {
      width: "2.3rem",
      height: "2.3rem",
    },
    img: {
      borderRadius: "100%",
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
  },
  ".dropdownContent": {
    backgroundColor: "white",
    border: "1px solid black!important",
    color: "red",
  },
};
