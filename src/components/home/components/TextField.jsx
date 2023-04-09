import styled from '@emotion/styled'

const StyledTextField = styled.div({
  position: "relative",
  width: "100%",
  overflow:"hidden",
  textarea: {
    resize: "none",
    minHeight: "200px",
    lineHeight: 2,
  },

  "input, textarea": {
    backgroundColor: "#F5F5F5",
    fontSize: "1rem",
    border: "1px solid #C3C3C3",
    borderRadius: "10px",
    height: "55px",
    outline: "unset",
    padding: "1.2rem 1rem 0",
    caretColor: "#7E7E7E",
    width: "100%",
    "&:hover":{
      borderColor: "#7E7E7E",
    },
    "&:focus": {
      borderColor: "#155AAA",
    },
    "&[aria-errormessage]": {
      borderColor: "#E44545",
    },
    "&:autofill, &:-webkit-autofill": {
      transition: " background-color 9999s ease-in-out 0s",
      "-webkit-text-fill-color": "#7E7E7E",
    },
  },
  label: {
    position: "absolute",
    fontSize: "1rem",
    top: "31px",
    left: "1.2em",
    transform: "translateY(-50%)",
    transition: "ease 300ms top, ease 300ms font-size",
    color: "#C3C3C3",
    cursor: "text",
  },
  "input:required + label::after, textarea:required + label::after,": {
    content: '" *"',
  },
  "input:not(:placeholder-shown) + label, input:focus + label, textarea:not(:placeholder-shown) + label, textarea:focus + label":
    {
      top: "14px",
      fontSize: "0.75rem",
    },
  "&:focus-within": {
    zIndex: 100,
  },
  "&:has(input[aria-errormessage]), &:has(textarea[aria-errormessage])": {
    zIndex: 1,
  },
});

function TextField({ label, id, error, textarea, ...props }) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <>
      <StyledTextField>
        {textarea ? (
          <textarea
            name={id}
            id={id}
            aria-errormessage={errorId}
            placeholder=" "
            {...props}
          />
        ) : (
          <input
            name={id}
            id={id}
            aria-errormessage={errorId}
            placeholder=" "
            {...props}
          />
        )}

        <label htmlFor={id}>{label || id}</label>
        {error ? <ErrorMessage id={errorId} error={error.message} /> : null}
      </StyledTextField>
    </>
  );
}

export { TextField };
