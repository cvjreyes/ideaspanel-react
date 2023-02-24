import React, { useContext, useEffect } from "react";
import { useNotifications } from "reapop";
import { useLocation, useRoute } from "wouter";

import { AuthContext } from "../../../context/AuthContext";
import { api } from "../../../helpers/api";

export default function CheckLogin() {
  const [match, { user_id, token }] = useRoute("/log_in/:user_id/:token");
  const [location, navigate] = useLocation();
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
