import styled from "@emotion/styled";

const Button = styled.button({
  padding: "0.75rem 1rem",
  background: "#155AAA",
  border: "unset",
  color: "white",
  borderRadius: "5px",
  display: "flex",
  gap: "0.4rem",
  alignItems: "center",
  cursor: "pointer",
  transition: "ease 0.3s all",
  "&:hover":{
    backgroundColor: "#154782"
  },
  "& svg": {
    color: "white",
  },
});

export { Button };
