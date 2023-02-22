/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNotifications } from "reapop";

import { api } from "../../../helpers/api";
import Button from "../../general/Button";
import Input from "../../general/Input";

import TechnipLogo from "../../../assets/images/technip.png";
import Eye from "../../../assets/images/eye.png";

export default function CreatePassword() {
  const [passwordShown, setPasswordShown] = useState(false);
  const { notify } = useNotifications();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { body } = await api("post", "/users/create_password", {
      email: form.email,
    });
    console.log("Password: ", form.password);
    console.log("Confirm password: ", form.confirmPassword);
    // console.log("submit: ", body.email);
  };

  useEffect(() => {
    // 2. Create a notification.
    notify("Welcome to the documentation", "info");
  }, []);

  return (
    <div css={styleLogin}>
      <img src={TechnipLogo} alt="technip" className="technipLogo" />
      <form onSubmit={handleSubmit} className="boxLog">
        <h1 className="ideaspanel-title flexCenter">Ideas Panel</h1>
        <div className="divBox">
          <label>Enter your new password:</label>
        </div>
        <label className="bold">Password</label>
        <div className="divBox" htmlFor="password">
          <Input
            id="password"
            name="password"
            value={form.password}
            type={passwordShown ? "text" : "password"}
            margin="10px auto"
            onChange={handleChange}
          />
          <img
            onClick={() => setPasswordShown((prevVal) => !prevVal)}
            src={Eye}
            alt="eye"
            className="eyeStyle pointer"
          />
        </div>
        <label className="bold">Confirm Password</label>
        <div className="divBox" htmlFor="confirmPassword">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            type={passwordShown ? "text" : "password"}
            margin="10px auto"
            onChange={handleChange}
          />
          <img
            onClick={() => setPasswordShown((prevVal) => !prevVal)}
            src={Eye}
            alt="eye"
            className="eyeStyle pointer"
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
    padding: "40px",
    background: "linear-gradient(225deg, #e6e6e6, #ffffff)",
    ":hover": {
      boxShadow: "-8px 8px 16px #dedede, 8px -8px 16px #ffffff",
    },
    ".ideaspanel-title": {
      fontSize: "30px",
    },
    ".divBox": {
      textAlign: "left",
      display: "flex",
      padding: "20px",
      position: "relative",
      alignItems: "center",
      ".eyeStyle": {
        position: "absolute",
        right: "30px",
        width: "20px",
      },
    },
    input: {
      alignItems: "left",
      width: "50vh",
    },
  },
};
