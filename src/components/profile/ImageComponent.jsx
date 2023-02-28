/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageComponent({ idea, image }) {
  const onDrop = useCallback((files) => {
    setImage(files[0]);
  }, []);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/svg": [],
    },
  });

  const handleDeleteImage = () => {
    console.log("test");
    // open modal here
  };

  if (idea.image)
    return (
      <div
        css={imageWrapperStyle}
        onClick={handleDeleteImage}
        className="pointer"
      >
        <img
          className="close"
          alt="close"
          src="https://img.icons8.com/color/48/null/close-window.png"
        />
        <img alt="idea" src={idea.image} />
      </div>
    );

  if (image)
    return (
      <div css={{ ...dropzoneWrapperStyle, ...imgUploadedStyle }}>
        <img
          alt="pic icon"
          src="https://img.icons8.com/3d-plastilina/69/null/image--v2.png"
        />
        <p>Image Uploaded ✔</p>
        <p>
          '{image.name}' {(image.size / (1024 * 1024)).toFixed(2)}MB
        </p>
      </div>
    );

  return (
    <div
      css={{ ...dropzoneWrapperStyle, ...imgToUploadStyle }}
      className="pointer"
      {...getRootProps()}
      style={{
        border: `1px dashed ${isDragReject ? "red" : "rgb(133, 133, 133)"}`,
      }}
    >
      {isDragReject
        ? [
            <img
              alt="error"
              src="https://img.icons8.com/pastel-glyph/64/null/error-handling.png"
              key="1"
            />,
            <p key="2">Only accepts .jpg, .jpeg and .png</p>,
          ]
        : [
            <input {...getInputProps()} key="1" />,
            <img
              alt="drop"
              src="https://img.icons8.com/ios/50/null/downloading-updates.png"
              key="2"
            />,
            <p key="3">Only accepts .jpg, .jpeg and .png</p>,
          ]}
    </div>
  );
}

const imageWrapperStyle = {
  border: "1px dashed rgb(133, 133, 133)",
  height: "300px",
  width: "300px",
  position: "relative",
  ".close": {
    position: "absolute",
    width: "30px",
    height: "30px",
    right: 0,
    display: "none",
  },
  ":hover .close": {
    display: "block",
  },
};

const dropzoneWrapperStyle = {
  margin: "75px 0 0",
  display: "flex",
  flexDirection: "column",
  height: "300px",
  width: "300px",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  borderRadius: "8px",
  transition: "all 200ms linear",
  img: {
    width: "50px",
  },
  p: {
    fontSize: "12px",
    marginTop: "20px",
  },
};

const imgUploadedStyle = {
  border: "1px solid rgb(133, 133, 133)",
};

const imgToUploadStyle = {
  ":hover": {
    backgroundColor: "rgba(225, 234, 248, 0.71)",
  },
};
