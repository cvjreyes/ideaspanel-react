/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";

import { useNavigation, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";

export default function Idea() {
  const {idea_id} = useParams();
  const navigate = useNavigation();

  const { user } = useContext(AuthContext);

  const [idea, setIdea] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const getIdeaInfo = async () => {
      const { body } = await api("get", `/ideas/get_info/${idea_id}`);
      if (body.user_id != user.id || body.published || body.draft)
        return navigate("/");
      setIdea(body);
    };
    getIdeaInfo();
  }, []);

  return (
    <div css={ideaStyle}>
      <h1 className="page_title">Idea</h1>
      <form>
        <div className="left">
          <div className="bold title">{idea.title}</div>
          <div className="info">{idea.description}</div>
          <div className="image">
            {idea.image && <img src={idea.image} alt="idea" />}
          </div>
        </div>
      </form>
    </div>
  );
}

const ideaStyle = {
  minHeight: "70vh",
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    padding: "50px 10vw 0",
    ".left": {
      minWidth: "500px",
      display: "flex",
      flexDirection: "column",
      ".info": {
        margin: "20px 40px 0  0",
      },
      ".title": {
        margin: "10px 40px 0  0",
        fontSize: "25px",
      },
      ".image": {
        display: "flex",
        justifyContent: "start",
        marginTop: "50px",
        img: {
          height: "200px",
          width: "350px",
        },
      },
    },
  },
};
