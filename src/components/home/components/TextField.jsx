import styled from "@emotion/styled";

const StyledTextField = styled.div({
  position: "relative",
  width: "100%",
  overflow: "hidden",

  "input, textarea": {
    backgroundColor: "#F5F5F5",
    fontSize: "1rem",
    border: "1px solid #C3C3C3",
    borderRadius: "5px",
    height: "45px",
    outline: "unset",
    padding: "0.9rem 1rem 0",
    caretColor: "#7E7E7E",
    width: "100%",
    "&:hover": {
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
    top: "50%",
    left: "1.2em",
    transform: "translateY(-50%)",
    transition: "ease 300ms top, ease 300ms font-size",
    color: "#C3C3C3",
    cursor: "text",
  },
  "&:has(textarea) label":{
    top:"25px"
  },
  textarea: {
    resize: "none",
    minHeight: "200px",
    lineHeight: 2,
    label: {
      top:"10px"
    }
  },
  "input:required + label::after, textarea:required + label::after,": {
    content: '" *"',
  },
  "input:not(:placeholder-shown) + label, input:focus + label, textarea:not(:placeholder-shown) + label, textarea:focus + label":
    {
      top: "12px",
      fontSize: "0.68rem",
      color:"#155AAA"
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
