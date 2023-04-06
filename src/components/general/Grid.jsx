import styled from "@emotion/styled";

const Grid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat( auto-fill, minmax(20rem, 1fr))",
  gap: "1rem",
  overflowY: "auto",
  gridAutoRows:" min-content",
  height: "100%",
});

export { Grid };
