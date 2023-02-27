/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect } from "react";
import { api } from "../../helpers/api";

export default function Comittee() {
  useEffect(() => {
    const getOldestUnapprovedIdea = async () => {
      const { ok, body } = await api("get", "/ideas/to_approve");
      console.log(ok, body);
    };
    getOldestUnapprovedIdea();
  }, []);

  return (
    <div css={comitteeStyle}>
      <h1 className="page_title">Comittee</h1>
    </div>
  );
}

const comitteeStyle = {
  minHeight: "calc(100vh - 50px)",
};
