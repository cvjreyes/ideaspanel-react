/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { api } from "../../helpers/api";
import { IoMdCreate } from "react-icons/io";
import { Grid } from "../general/Grid";
import Pagination from "../general/Pagination";
import { Section } from "../general/Section";
import NoResults from "../general/NoResults";
import { Button } from "./components/Button";
import { IdeaCard } from "./components/Card";
import { TextField } from "./components/TextField";

export default function Home() {
  const [ideas, setIdeas] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIdeas, setFilteredIdeas] = useState([]);

  const itemsPerPage = 8; // o el número de elementos que desee mostrar por página

  const getIdeas = async () => {
    const { body } = await api("get", "/ideas/get_some");
    setIdeas(body);
  };

  useEffect(() => {
    getIdeas();
  }, []);

  useEffect(() => {
    if (!ideas) return; // evitar errores mientras se carga data
    setFilteredIdeas(
      ideas.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [ideas, searchTerm]);

  const paginate = (array) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
  };

  return (
    <Section css={homeStyle} fullHeight>
      <div className="header">
        <h1 className="title">Home</h1>
        <div className="header__actions">
          <TextField
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button as="a" href="/new_idea">
            Add new <IoMdCreate />
          </Button>
        </div>
      </div>
      {filteredIdeas.length ? (
        <Grid>
          {paginate(filteredIdeas).map((idea) => (
            <IdeaCard
              info={idea}
              key={idea?.id}
              navigateTo={`/idea/${idea.id}`}
            />
          ))}
        </Grid>
      ) : (
        <NoResults />
      )}

      <div className="pagination">
        {filteredIdeas && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            displayData={filteredIdeas}
            itemsPerPage={itemsPerPage}
            maxPagesToShow={3}
          />
        )}
      </div>
    </Section>
  );
}

const homeStyle = {
  ".header": {
    display: "flex",
    alignItems: "start",
    justifyContent: "space-between",
    flexWrap: "wrap",
    ".title": {
      fontSize: "1.4rem",
      textTransform: "uppercase",
    },
    "&__actions": {
      display: "flex",
      justifyContent: "end",
      gap: "0.5rem",
    },
    "& > *": {},
  },
  ".pagination": {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    margin: "auto",
    div: {
      display: "inline-block",
      margin: "0 5px",
      padding: "5px 10px",
      cursor: "pointer",
    },
    ".active": {
      backgroundColor: "#0077cc",
      color: "#fff",
      border: "none",
    },
  },
};
