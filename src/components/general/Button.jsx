import styled from "@emotion/styled";

const variants = {
  contained: {
    background: "#155AAA",
    color: "white",
    "&:hover": {
      backgroundColor: "#154782",
    },
    "& svg": {
      color: "white",
    },
    "&:disabled": {
      cursor: "default",
      color: "#7E7E7E",
      backgroundColor: "#C3C3C3",
    },
  },
  outlined: {
    border: "1px solid #1E75DB",
    color: "#155AAA",
    background: "unset",
    "&:hover": {
      borderColor: "#154782",
    },
    "& svg": {
      color: "#154782",
    },
    "&:disabled": {
      cursor: "default",
      color: "#7E7E7E",
      borderColor: "#C3C3C3",
    },
  },
};
const Button = styled.button(
  {
    justifyContent: "center",
    display: "flex",
    flexShrink: 0,
    gap: "0.4rem",
    alignItems: "center",
    padding: "0.85rem 1.3rem",
    fontSize: "0.7rem",
    fontWeight: 500,
    textTransform: "uppercase",
    border: "unset",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "ease 0.3s all",
  },
  ({ variant = "contained" }) => variants[variant]
);

export { Button };
