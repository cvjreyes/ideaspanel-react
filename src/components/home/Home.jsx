/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";

import { api } from "../../helpers/api";

import Pagination from "../general/Pagination";
import Card from "../general/Card";
import Input from "../general/Input";
import Loading from "../general/Loading";
import NoResultsHome from "./NoResultsHome";
import { IoMdCreate } from "react-icons/io";
import { FullSection } from "../general/FullSection";
import { IdeaCard } from "./components/Card";
import { Grid } from "../general/Grid";
import { TextField } from "./components/TextField";
import { Button } from "./components/Button";

export default function Home() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const itemsPerPage = 8; // o el número de elementos que desee mostrar por página

  const getData = async () => {
    const { body } = await api("get", "/ideas/get_some");
    setData(body);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!data) return; // evitar errores mientras se carga data
    setFilteredData(
      data.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [data, searchTerm]);

  const paginate = (array) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
  };

  return (
    <FullSection css={homeStyle}>
      <div className="header">
        <h1 className="title">Home</h1>
        <div className="header__actions">
          <TextField
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button as="a" to="/ideas_panel/new_idea">
            Add new <IoMdCreate />
          </Button>
        </div>
      </div>
      {filteredData.length ? (
        <Grid>
          {paginate(filteredData).map((idea) => (
            <IdeaCard
              info={idea}
              key={idea?.id}
              navigateTo={`/idea/${idea.id}`}
            />
          ))}
        </Grid>
      ) : (
        <NoResultsHome />
      )}

      <div className="pagination">
        {filteredData && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            displayData={filteredData}
            itemsPerPage={itemsPerPage}
            maxPagesToShow={3}
          />
        )}
      </div>
    </FullSection>
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
      gap: "1rem",
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
