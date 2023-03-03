/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { colors } from "../../helpers/colors";
import ButtonWithImage from "../general/ButtonWithImage";

export default function Modal({ isOpen, closeModal, confirm }) {
  if (!isOpen) return false;
  return [
    <div css={modalStyle} key="3">
      <h3>Are you sure you want to delete?</h3>
      <div className="buttonWrapper">
        <ButtonWithImage
          text="No"
          bgColor={colors["red"].background}
          bgHover={colors["red"].backgroundHover}
          color="white"
          onClick={closeModal}
        />
        <ButtonWithImage
          type="button"
          text="Yes"
          bgColor={colors["green"].background}
          bgHover={colors["green"].backgroundHover}
          color="white"
          onClick={confirm}
        />
      </div>
    </div>,
    <div css={blurStyle} key="4" onClick={closeModal} />,
  ];
}

const modalStyle = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  width: "600px",
  height: "380px",
  backgroundColor: "lightgray",
  textAlign: "center",
  paddingTop: "130px",
  borderRadius: "12px",
  boxShadow: "2px 2px 8px 0px rgba(0,0,0,0.5)",
  zIndex: 5,
  ".buttonWrapper": {
    display: "flex",
    marginTop: "2rem",
    button: {
      margin: "0 1rem",
    },
  },
};

const blurStyle = {
  position: "absolute",
  backdropFilter: "blur(1px)",
  height: "98vh",
  width: "98vw",
  top: 0,
  left: 0,
};
