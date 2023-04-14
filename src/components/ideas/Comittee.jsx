/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";

import { Grid } from "../general/Grid";
import Loading from "../general/Loading";
import { Section } from "../general/Section";
import NoResults from "../general/NoResults";
import { IdeaCard } from "../general/IdeaCard";
import Pagination from "../general/Pagination";

export default function NewComittee() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4; // o el número de elementos que desee mostrar por página

  useLayoutEffect(() => {
    if (!user.isComittee) return navigate("/");
    const getData = async () => {
      const { body } = await api("get", "/ideas/get_all_validating");
      setData(body);
    };
    getData();
  }, []);

  const paginate = (array) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
  };

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
            paginate(data).map((idea) => (
              <IdeaCard
                idea={idea}
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
      {data && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          displayData={data}
          itemsPerPage={itemsPerPage}
          maxPagesToShow={3}
        />
      )}
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
      fontSize: "1.3rem",
      cursor: "pointer",
      ":hover": {
        transform: "rotate(180deg)",
        transition: "transform 0.5s ease-in-out",
      },
    },
  },
};
