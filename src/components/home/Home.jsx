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
import { Grid } from "./components/Grid";

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
          <input type="text" className="input" />
          <button className="button">
            Add new <IoMdCreate />
          </button>
        </div>
      </div>
      <Grid>
        {paginate(filteredData).map((idea) => (
          <IdeaCard {...idea} key={idea?.id} />
        ))}
      </Grid>
      <div className="pagination">
        {filteredData && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            displayData={Array(20).fill()}
            itemsPerPage={itemsPerPage}
            maxPagesToShow={3}
          />
        )}
      </div>
      {/* <h1 className="page_title">Ideas Panel</h1>
      <div className="search_box">
        {filteredData && (
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </div>
      <div className="map">
        {filteredData ? (
          filteredData.length > 0 ? (
            paginate(filteredData).map((item, i) => (
              <Card item={item} key={i} />
            ))
          ) : (
            <NoResultsHome />
          )
        ) : (
          <Loading />
        )}
      </div> */}
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
      flex: "0 0 1",
    },
    "& > *": {
      flex: "1",
    },
  },
  ".button": {
    padding: "0.75rem 1rem",
    background: "#155AAA",
    border: "unset",
    color: "white",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    "& svg": {
      marginLeft: "0.5rem",
      color: "white",
    },
  },
  " .input": {
    width: "auto",
    border: "1px solid #C3C3C3",
    borderRadius: "5px",
    padding: "1rem",
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
/* const homeStyle = {
  minHeight: "calc(80vh - 50px)",
  padding: "0 5vw",
  ".search_box": {
    margin: "20px 0 20px 8%",
  },
  ".map": {
    display: "grid",
    justifyContent: "center",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 320px))",
    marginTop: "50px",
    gap: "50px",
  },
 
}; */
