import React, { useContext, useEffect } from "react";
import { useNotifications } from "reapop";

import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { api } from "../../../helpers/api";

export default function CheckLogin() {
  const {user_id, token} = useParams();
  const navigate = useNavigate();
  const { notify } = useNotifications();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const validateCredentials = async () => {
      const { ok, body } = await api("post", "/users/validate_credentials", {
        user_id,
        token,
      });
      if (!ok) {
        notify(body, "info");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else login(body);
    };
    validateCredentials();
  }, []);

  return <div>CheckLogin</div>;
}
