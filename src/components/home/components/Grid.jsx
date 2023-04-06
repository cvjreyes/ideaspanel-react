import styled from '@emotion/styled'

const Grid = styled.div({
    display: "grid",
    gridTemplateColumns: "repeat( auto-fill, minmax(20rem, 1fr))",
    gridTemplateRows:"auto auto",
    gap: "1rem",
    overflow: "auto",
    height: "100%"
})

export { Grid}


