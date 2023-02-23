/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState } from "react";
import { useNotifications } from "reapop";

import { api } from "../../../helpers/api";
import Button from "../../general/Button";
import Input from "../../general/Input";
import TechnipLogo from "../../../assets/images/technip.png";

export default function Login() {
  const { notify } = useNotifications();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return notify("Where do we send the link?", "warning");
    const { ok, body } = await api("post", "/users/login", { email });
    console.log(ok, body);
    if (!ok) return notify("Problems with the email", "warning");
    notify(`Email sent it to ${email}`, "success");
    setEmail("");
  };

  return (
    <div css={styleLogin}>
      <img src={TechnipLogo} alt="technip" className="technipLogo" />
      <form onSubmit={handleSubmit} className="form">
        <h1 className="title flexCenter">Ideas Panel</h1>
        <div className="inputWrapper">
          <p>Enter your email:</p>
          <Input
            placeholder={"Email..."}
            id="email"
            name="email"
            value={email}
            type="email"
            margin="20px auto 0"
            onChange={(e) => setEmail(e.target.value)}
            width="100%"
          />
        </div>
        <Button
          bgColor="linear-gradient(322deg, rgba(0,105,223,1) 0%, rgba(0,112,237,1) 21%, rgba(22,128,247,1) 100%)"
          bgHover="linear-gradient(180deg, #338DF1 -2.23%, #338DF1 -2.22%, #85BFFF 148.66%)"
          text={"Login"}
          color={"white"}
          width="120px"
          margin="100px 0 0"
          border={"1px solid black"}
        />
      </form>
    </div>
  );
}

const styleLogin = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  ".technipLogo": {
    position: "absolute",
    top: "80px",
    left: "100px",
    width: "140px",
  },
  ".form": {
    borderRadius: "10px",
    border: "1px solid black",
    padding: "100px",
    background: "linear-gradient(300deg, #e6e6e6, #ffffff)",
    width: "700px",
    height: "60vh",
    ".title": {
      fontSize: "30px",
      margin: "0 0 20px 0",
    },
    ".inputWrapper": {
      textAlign: "left",
      margin: "100px auto 0",
      width: "80%",
    },
  },
};
