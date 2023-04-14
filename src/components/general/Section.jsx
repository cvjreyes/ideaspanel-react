import styled from "@emotion/styled";

const Section = styled.div(
  {
    padding: "6rem 5vw 1rem 5vw",
    maxWidth:"100rem",
    marginInline:"auto",
    overflow: "hidden",
    display: "flex",
    gap: "1.3rem",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  ({fullHeight}) => fullHeight &&{
    height: "100vh"
  }
);

export { Section };
