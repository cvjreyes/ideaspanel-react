import styled from "@emotion/styled";

const variant = {
  outlined:{

  },
  contain:{

  },
  text:{
    
  }
}
const Button = styled.button({
  display: "flex",
  flexShrink:0,
  gap: "0.4rem",
  alignItems: "center",
  padding: "0.85rem 1.3rem",
  background: "#155AAA",
  color: "white",
  fontSize: "0.7rem",
  fontWeight: 500,
  textTransform:"uppercase",
  border: "unset",
  borderRadius: "5px",
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
