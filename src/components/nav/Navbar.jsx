/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useContext } from "react";

import {
  AiOutlinePoweroff,
  AiOutlineUser,
  AiOutlineCaretDown,
} from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(9);

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
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="dropdownTrigger">
                <div className="imgContainer">
                  <img src={user.profile_pic} />
                </div>
                <AiOutlineCaretDown />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content sideOffset={10} className="dropdownContent">
                <p>{user.name}</p>
                <DropdownMenu.Item
                  onClick={() => navigate(`/profile/${user.id}/Published`)}
                >
                  Profile
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={logout}>Logout</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
      <Outlet />
    </>
  );
}

const navbarStyle = {
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
