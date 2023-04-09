/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useRef } from "react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  displayData,
  itemsPerPage,
  maxPagesToShow,
}) {
  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  let lowerLimit = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let upperLimit = Math.min(totalPages, lowerLimit + maxPagesToShow - 1);
  lowerLimit = Math.max(1, upperLimit - maxPagesToShow + 1);

  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const currentPageRef = useRef(null);

  const focusPrevButton = () => {
    prevButtonRef.current && prevButtonRef.current.focus();
  };

  const focusNextButton = () => {
    nextButtonRef.current && nextButtonRef.current.focus();
  };

  useEffect(() => {
    if (currentPage === 1) {
      focusNextButton();
    } else if (currentPage === totalPages) {
      focusPrevButton();
    }

    currentPageRef.current && currentPageRef.current.focus();
  }, [currentPage, totalPages]);

  return (
    <div css={paginationStyle}>
      {currentPage !== 1 && (
        <button
          ref={prevButtonRef}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="prev_btn"
        >
          {"<"}
        </button>
      )}
      {totalPages > 2
        ? Array(totalPages)
            .fill()
            .map((_, i) => {
              if (i + 1 >= lowerLimit && i + 1 <= upperLimit) {
                return (
                  <button
                    key={i}
                    ref={i + 1 === currentPage ? currentPageRef : null}
                    onClick={() => setCurrentPage(i + 1)}
                    style={{ fontWeight: currentPage === i + 1 && "bold" }}
                    className="active_page"
                  >
                    {i + 1}
                  </button>
                );
              } else if (i + 1 === lowerLimit - 1 || i + 1 === upperLimit + 1) {
                return (
                  <span key={i} className="dots">
                    ...
                  </span>
                );
              } else {
                return null;
              }
            })
        : null}
      {currentPage !== totalPages && displayData.length > 10 && (
        <button
          ref={nextButtonRef}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="next_btn"
        >
          {">"}
        </button>
      )}
    </div>
  );
}

const paginationStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
  ".prev_btn": {
    height: "2.5rem",
    width: "2.5rem",
    margin: "0 0.5rem",
    padding: "0.5rem",
    border: "unset",
    borderRadius: "5px",
    color: "#7E7E7E",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "unset",
    ":hover": {
      backgroundColor: "#F5F5F5",
    },
    ":disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
  ".active_page": {
    height: "2.5rem",
    width: "2.5rem",
    margin: "0 0.5rem",
    padding: "0.5rem",
    border: "unset",
    borderRadius: "5px",
    color: "#7E7E7E",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "unset",
    ":hover": {
      backgroundColor: "#14529A",
    },
    ":focus": {
      outline: "none",
      backgroundColor: "#155AAA",
      color: "#fff",
    },
    ":disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
  ".dots": {
    margin: "0 0.5rem",
    padding: "0.5rem",
    fontWeight: "bold",
    color: "#777",
  },
  ".next_btn": {
    height: "2.5rem",
    width: "2.5rem",
    margin: "0 0.5rem",
    padding: "0.5rem",
    border: "unset",
    borderRadius: "5px",
    color: "#7E7E7E",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "unset",
    ":hover": {
      backgroundColor: "#F5F5F5",
    },
    ":disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
  ".no_pages": {
    margin: "0 0.5rem",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "lightgray",
    color: "#333",
    cursor: "not-allowed",
    fontWeight: "bold",
  },
};
