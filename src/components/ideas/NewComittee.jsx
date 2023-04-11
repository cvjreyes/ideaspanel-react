/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";

import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Grid } from "../general/Grid";
import Loading from "../general/Loading";
import { Section } from "../general/Section";
import NoResults from "../home/NoResults";
import { IdeaCard } from "../home/components/Card";

export default function NewComittee() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    if (!user.isComittee) return navigate("/");
    const getData = async () => {
      const { body } = await api("get", "/ideas/get_all_validating");
      setData(body);
    };
    getData();
  }, []);

  return (
    <Section css={comitteeStyle} fullHeight>
      <div className="top">
        <h1>Comittee</h1>
        <Link to="/comittee/manage">
          <AiOutlineSetting className="manage_btn" />
        </Link>
      </div>
      <Grid>
        {data ? (
          data.length > 0 ? (
            data.map((idea) => (
              <IdeaCard
                info={idea}
                navigateTo={`/comittee/${idea.id}`}
                comittee
                key={idea.id}
              />
            ))
          ) : (
            <NoResults />
          )
        ) : (
          <Loading />
        )}
      </Grid>
    </Section>
  );
}

const comitteeStyle = {
  ".top": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    ".manage_btn": {
      backgroundColor: "transparent",
      fontSize:"1.3rem",
      cursor: "pointer",
      ":hover": {
        transform: "rotate(180deg)",
        transition: "transform 0.5s ease-in-out",
      },
    },
  },
};
