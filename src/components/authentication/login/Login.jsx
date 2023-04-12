/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState } from "react";
import { useNotifications } from "reapop";

import { api } from "../../../helpers/api";
import Input from "../../general/Input";
import TechnipLogo from "../../../assets/images/technip.png";
import { Section } from "../../general/Section";
import { Button } from "../../general/Button";
import { TextField } from "../../general/TextField";

export default function Login() {
  const { notify } = useNotifications();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return notify("Where do we send the link?", "warning");
    const { ok, body } = await api("post", "/users/login", { email });
    if (!ok) return notify(body, "warning");
    notify(body, "success");
    setEmail("");
  };

  return (
    <div css={styleLogin}>
      <form onSubmit={handleSubmit} className="form">
        <img src={TechnipLogo} alt="technip" className="technipLogo" />
        <h1 className="title flexCenter">Ideas panel</h1>
        <div className="inputWrapper">
          <TextField
            id="email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="button">Login</Button>
        </div>
      </form>
    </div>
  );
}

const styleLogin = {
  height:"100vh",
  display: "flex",
  justifyContent: "center",
  backgroundColor:"#E3EBF5",
  alignItems: "center",
  ".technipLogo": {
    width: "140px",
    display:"block",
    marginInline:"auto",
    marginBottom:"1rem"
  },
  ".form": {
    minWidth:"30rem",
    borderRadius: "10px",
    border: "1px solid #C3C3C3",
    padding: "2.5rem",
    backgroundColor:"#F7F7F7",
    ".title": {
      fontSize: "30px",
      marginBottom:"3rem"
    },
    ".inputWrapper":{
      display: "flex",
      gap:"0.7rem",
      flexDirection:"column"
    },
    ".button":{
      width:"100%"
    }
  },
};
