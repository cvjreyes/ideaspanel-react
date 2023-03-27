/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";

import { api } from "../../helpers/api";

import Card from "../general/Card";
import Loading from "../general/Loading";
import NoResults from "./NoResults";

export default function Home() {
  const [data, setData] = useState(null);
  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  
  const getData = async () => {
    const { body } = await api("get", `/ideas/get_some/${currentPage}`);
    setData(body);
  };
  
  useEffect(() => {
    const getPages = async () => {
      const { body: pages } = await api("get", "/ideas/get_page_published");
      const pagesArray = [];
      for (let i = 0; i < pages; i++) {
        pagesArray.push(i + 1);
      }
      setTotalPages(pagesArray);
    };
    getData();
    getPages();
  }, []);

  useEffect(() => {
    getData();
  }, [currentPage]);

  function handleClickPage(e) {
    setCurrentPage(e - 1);
  }

  return (
    <div css={homeStyle}>
      <h1 className="page_title">Ideas Panel</h1>
      {data ? (
        data.length > 0 ? (
          <div>
            <div className="pagination">
              {totalPages?.map((page) => (
                <div
                  key={page}
                  className={page === currentPage + 1 ? "active" : ""}
                  onClick={() => handleClickPage(page)}
                >
                  {page}
                </div>
              ))}
            </div>
            <div className="map">
              {data.map((item, i) => {
                return <Card item={item} key={i} />;
              })}
            </div>
          </div>
        ) : (
          <NoResults />
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}

const homeStyle = {
  minHeight: "calc(100vh - 50px)",
  padding: "0 5vw",
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
      border: "1px solid #ccc",
      borderRadius: "5px",
      cursor: "pointer",
    },
    ".active": {
      backgroundColor: "#0077cc",
      color: "#fff",
      border: "none",
    },
  },
};
