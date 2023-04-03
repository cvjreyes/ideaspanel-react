/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  displayData,
  itemsPerPage,
}) {
  return (
    <div css={paginationStyle}>
      {currentPage !== 1 && (
        <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
      )}
      {Math.ceil(displayData.length / itemsPerPage) < 2 ? (
        <button disabled style={{ fontWeight: "bold" }}>
          1
        </button>
      ) : (
        Array(Math.ceil(displayData.length / itemsPerPage))
          .fill()
          .map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{ fontWeight: currentPage === i + 1 && "bold" }}
            >
              {i + 1}
            </button>
          ))
      )}
      {currentPage !== Math.ceil(displayData.length / itemsPerPage) &&
        displayData.length > 10 && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        )}
    </div>
  );
}

const paginationStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
  button: {
    margin: "0 0.4rem",
    padding: "0.3rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#ccc",
    },
    ":focus": {
      outline: "none",
      backgroundColor: "#ccc",
      boxShadow: "0 0 0 3px #ddd",
    },
    ":disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
};
