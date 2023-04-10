/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useLayoutEffect, useState } from "react";
import { Link, useLocation } from "wouter";

import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";

import ButtonWithImage from "../general/ButtonWithImage";
import Loading from "../general/Loading";
import NoResults from "../home/NoResults";
import { IdeaCard } from "../home/components/Card";
import { Grid } from "../general/Grid";
import { FullSection } from "../general/FullSection";
import { BsFillGearFill } from "react-icons/bs";

export default function NewComittee() {
  const [location, navigate] = useLocation();
  const { user } = useContext(AuthContext);

  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    if (!user.isComittee) return navigate("/");
    const getData = async () => {
      const { body } = await api("get", "/ideas/get_all_validating");
      setData(body);
    };
    getData();
  }, [location]);

  return (
    <FullSection css={comitteeStyle}>
      <div className="top">
        <h1>Comittee</h1>
        <Link to="/comittee/manage">
          <BsFillGearFill className="manage_btn" />
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
    </FullSection>
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
