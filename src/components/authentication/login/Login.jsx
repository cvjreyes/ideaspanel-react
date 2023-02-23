/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState } from "react";
import { Link } from "wouter";

import { api } from "../../../helpers/api";
import Button from "../../general/Button";
import Input from "../../general/Input";
import TechnipLogo from "../../../assets/images/technip.png";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api("post", "/users/login", {
      email: form.email,
    });
  };

  return (
    <div css={styleLogin}>
      <img src={TechnipLogo} alt="technip" className="technipLogo" />
      <form onSubmit={handleSubmit} className="boxLog">
        <h1 className="ideaspanel-title flexCenter">Ideas Panel</h1>
        <div className="divBox">
          <label>Enter your email to log in</label>
        </div>
        <div className="divBox">
          <Input
            placeholder={"Email..."}
            id="email"
            name="email"
            value={form.email}
            type="email"
            margin="20px auto"
            onChange={handleChange}
          />
        </div>
        <Button
          bgColor={"#0070ED"}
          bgHover={"#99C6F8"}
          text={"Login"}
          color={"white"}
          width="30%"
        />
      </form>
      <Link href="/create_password">
        <Button
          bgColor={"#0070ED"}
          bgHover={"#99C6F8"}
          text={"Create password"}
          color={"white"}
          width="10%"
          margin="50px 0 0 0"
        />
      </Link>
    </div>
  );
}

const styleLogin = {
  display: "flex",
  height: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  ".technipLogo": {
    position: "absolute",
    top: "80px",
    left: "100px",
    zIndex: "-100",
    width: "180px",
  },
  ".boxLog": {
    borderRadius: "10px",
    border: "1px solid black",
    padding: "40px",
    background: "linear-gradient(225deg, #e6e6e6, #ffffff)",
    boxShadow: "-8px 8px 16px #dedede, 8px -8px 16px #ffffff",
    ".ideaspanel-title": {
      fontSize: "30px",
      margin: "0 0 20px 0",
    },
    ".divBox": {
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      padding: "5px",
      fontWeight: "600",
    },
    input: {
      alignItems: "left",
      width: "50vh",
    },
  },
};
