/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";

import { api } from "../../helpers/api";

import Card from "../general/Card";
import Input from "../general/Input";
import Loading from "../general/Loading";
import NoResults from "./NoResults";

export default function Home() {
  const [data, setData] = useState(null);
  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const getData = async () => {
    const { body } = await api("get", `/ideas/get_some/${currentPage}`);
    setData(body);
  };

  const getPages = async () => {
    const { body: pages } = await api("get", "/ideas/get_page_published");
    const pagesArray = [];
    for (let i = 0; i < pages; i++) {
      pagesArray.push(i + 1);
    }
    setTotalPages(pagesArray);
  };

  const getFilterData = async () => {
    const { body } = await api(
      "get",
      `/ideas/get_some_filter/${searchTerm}/${currentPage}`
    );
    setData(body);
  };

  const getPagesFilter = async () => {
    const { body: pages } = await api(
      "get",
      `/ideas/get_filter_page_published/${searchTerm}`
    );
    const pagesArray = [];
    if (pages != 0) {
      for (let i = 0; i < pages; i++) {
        pagesArray.push(i + 1);
      }
    } else {
      pagesArray.push(1);
    }
    setTotalPages(pagesArray);
  };

  useEffect(() => {
    getData();
    getPages();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      getData();
      getPages();
    } else {
      getFilterData();
      getPagesFilter();
      setCurrentPage(0)
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm) {
      getData();
      getPages();
    } else {
      getFilterData();
      getPagesFilter();
    }
  }, [currentPage]);

  function handleClickPage(e) {
    setCurrentPage(e - 1);
  }

  return (
    <div css={homeStyle}>
      <h1 className="page_title">Ideas Panel</h1>
      <div className="search_box">
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
      {data ? (
        data.length > 0 ? (
          <div className="map">
            {data.map((item, i) => {
              return <Card item={item} key={i} />;
            })}
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
