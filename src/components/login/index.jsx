/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNotifications } from "reapop";

// import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";
import Button from "../general/Button";
import Input from "../general/Input";

export default function Login() {
  // const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
  });
  const { notify } = useNotifications();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { body } = await api("post", "/users/login", {
      email: form.email,
    });
    console.log("submit: ", form.email);
    // console.log("submit: ", body.email);
  };

  useEffect(() => {
    // 2. Create a notification.
    notify("Welcome to the documentation", "info");
  }, []);

  return (
    <div css={styleLogin}>
      <form onSubmit={handleSubmit}>
        <h1>Enter your email to sign up</h1>
        <Input
          placeholder={"Email..."}
          id="email"
          name="email"
          value={form.email}
          type="email"
          onChange={handleChange}
        />
        <Button text={"Login"} />
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
};
