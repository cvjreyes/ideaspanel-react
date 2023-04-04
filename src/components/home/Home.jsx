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

export default function Home() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  const itemsPerPage = 4; // o el número de elementos que desee mostrar por página

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
    <div css={homeStyle}>
      <h1 className="page_title">Ideas Panel</h1>
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
      </div>
    </div>
  );
}

const homeStyle = {
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
  ".pagination": {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    margin: "20px 0 0 8%",
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
