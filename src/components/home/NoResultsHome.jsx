/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";
import Button from "../general/Button";
import { useLocation } from "wouter";

export default function NoResultsHome() {
  const [__, navigate] = useLocation();

  return (
    <div css={noResultsStyle}>
      ❌ No ideas found...
      <br />
      <Button
        text="New Idea"
        onClick={() => navigate("/new_idea")}
        className="btn_new_idea"
      />
    </div>
  );
}

const shake = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  60% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
  100% { transform: translateX(0); }
`;

const noResultsStyle = {
  textAlign: "center",
  marginTop: "100px",
  fontSize: "20px",
  ".btn_new_idea": {
    marginTop: "10px",
    width:"150px",
    backgroundColor: "lightblue",
    color: "#fff",
    borderRadius: "5px",
    padding: "12px 24px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.2s ease-in-out",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
    ":hover": {
      backgroundColor: "lightskyblue",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
    },
    "@media (max-width: 480px)": {
      fontSize: "14px",
      padding: "10px 20px",
    },
  },
};
