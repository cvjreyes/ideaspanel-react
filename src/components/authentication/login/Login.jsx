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
    // notification email
    console.log("Email: ", email.value);
    if (email.value) {
      notify(`Email send it to ${email.value}`, "success");
    } else {
      notify("Problems with the email", "warning");
    }
  };

  return (
    <div css={styleLogin}>
      <img src={TechnipLogo} alt="technip" className="technipLogo" />
      <form onSubmit={handleSubmit} className="boxLog">
        <h1 className="ideaspanel-title flexCenter">Ideas Panel</h1>
        <div className="divBox">
          <label>Enter your email:</label>
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
          border={"1px solid black"}
        />
      </form>
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
    right: "100px",
    zIndex: "-100",
    width: "180px",
  },
  ".boxLog": {
    borderRadius: "10px",
    border: "1px solid black",
    padding: "30px",
    height: "calc(40vh - 10px)",
    background: "linear-gradient(300deg, #e6e6e6, #ffffff)",
    boxShadow: "15px 15px 16px #dedede, 8px -8px 16px #ffffff",
    ".ideaspanel-title": {
      fontSize: "30px",
      margin: "0 0 20px 0",
    },
    ".divBox": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "left",
      height: "calc(40vh - 150px)",
      padding: "5px",
      fontWeight: "600",
    },
    input: {
      alignItems: "left",
      width: "50vh",
    },
  },
};
