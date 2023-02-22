/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState } from "react";

// import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";
import Button from "../general/Button";
import Input from "../general/Input";

export default function Login() {
  // const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
  });

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

  return (
    <div css={styleLogin}>
      <div className="boxLogin">
        <form onSubmit={handleSubmit} >
          <h1>Enter your email to sign up</h1>
          <br />
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
    </div>
  );
}

const styleLogin = {
  display: "flex",
  justifyContent: "center",
  margin: "100px",
  ".boxLogin": {
    display: "flex",
    flexDirection: "column",
    input: {
      padding: "0px 10px",
    },
    button: {
      margin: "100px 10px",
      width: "50%",
      alignSelf: "center",
    },
  },
};
