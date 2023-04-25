/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotifications } from "reapop";
import { AiFillFilePdf } from "react-icons/ai";

import { AuthContext } from "../../context/AuthContext";
import { api } from "../../helpers/api";

import ButtonWithImage from "../general/ButtonWithImage";
import { CountdownTimer } from "../general/CountDown";
import Loading from "../general/Loading";
import { Section } from "../general/Section";

export default function NewComitteeSingleView() {
  const { id: idea_id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { notify } = useNotifications();

  const [data, setData] = useState(null);
  const [validateDate, setValidateDate] = useState(null);
  const [pdf, setPdf] = useState(null);

  const getData = async () => {
    const { body } = await api("get", `/ideas/get_info_and_vote/${idea_id}`);
    let sent_to_validate_at = new Date(body.sent_to_validate_at);
    setValidateDate(sent_to_validate_at);
    setPdf(body.pdf);
    setData(body);
  };

  useEffect(() => {
    if (!user.isComittee) return navigate("/");
    getData();
  }, []);

  useEffect(() => {
    if (data?.published) return navigate("/");
  }, [data]);

  const handleVote = async (vote) => {
    const { ok } = await api("post", "/comittee_votes/submit_vote", {
      idea_id: data.id,
      user_id: user.id,
      vote,
    });
    if (!ok) return notify("Something went wrong", "error");
    notify("Vote successfully done", "success");
    getData();
  };

  if (!data) return <Loading />;
  return (
    <Section css={singleViewStyle} fullHeight>
      <div className="top">
        <h1>Comitee</h1>
        <CountdownTimer date={data.sent_to_validate_at} />
      </div>
      <div className="box_info_card">
        <div className="left">
          <img
            src={data.image || "http://localhost:5026/images/no_image.jpg"}
            alt="idea"
            className="ideaImage"
          />
          {pdf && (
            <a
              href={pdf}
              download={pdf.split("-").slice(1).join("-")}
              target="_blank"
              className="download_pdf"
            >
              Download PDF <AiFillFilePdf size={30} />
            </a>
          )}
        </div>
        <div className="right">
          <div className="topRight">
            <div>
              <div className="title">{data.title}</div>
              <div className="date">
                {validateDate.toLocaleString("es-ES", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
            <BoxVotes handleVote={handleVote} approved={data.approved} />
          </div>
          <div className="bottomRight">
            <div className="description">{data.description}</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

const BoxVotes = ({ handleVote, approved }) => {
  return (
    <div className="boxVotes">
      <VoteWrapper voted={approved !== null && !approved}>
        <ButtonWithImage
          text="Denied"
          type="button"
          className={approved !== null && !approved ? "active_vote" : "vote"}
          onClick={() => handleVote(0)}
        />
      </VoteWrapper>
      <VoteWrapper voted={approved}>
        <ButtonWithImage
          text="Approved"
          type="button"
          onClick={() => handleVote(1)}
          className={approved ? "active_vote" : "vote"}
        />
      </VoteWrapper>
    </div>
  );
};

const VoteWrapper = ({ children, voted }) => {
  const voteWrapperStyle = {
    padding: "5px",
    // border: voted && "2px solid blue",
    borderRadius: "6px",
  };

  return <div css={voteWrapperStyle}>{children}</div>;
};

const singleViewStyle = {
  ".top": {
    display: "flex",
    justifyContent: "space-between",
  },
  ".box_info_card": {
    display: "flex",
    height: "100%",
    width: "100%",
    ".left": {
      marginRight: "30px",
      flex: "1",
      ".ideaImage": {
        marginBottom: "30px",
      },
      ".download_pdf": {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#155AAA",
        color: "white",
        padding: "5px 10px",
        borderRadius: "4px",
        textDecoration: "none",
        width:"180px",
        ":hover": {
          background: "#C4C4C4",
        },
      },
    },
    ".right": {
      flex: "1",
      minWidth: "500px",
      ".topRight": {
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #C4C4C4",
        padding: "0 0 20px 0",
        ".title": {
          fontWeight: "600",
          fontSize: "18px",
          lineHeight: "22px",
        },
        ".date": {
          marginTop: "10px",
          color: "#7E7E7E",
        },
      },
      ".bottomRight": {
        padding: "20px 0",
        ".description": {
          color: "#7E7E7E",
        },
      },
    },
  },
  ".boxVotes": {
    display: "flex",
    justifyContent: "end",
    ".vote": {
      color: "#155AAA",
      cursor: "pointer",
      position: "relative",
      outline: "none",
      transition: "all 0.3s ease",
      borderRadius: "5px",
      border: "1px solid #155AAA",
      background: "white",
      ":hover": {
        color: "white",
        background: "#155AAA",
      },
    },
    ".active_vote": {
      color: "white",
      background: "#155AAA",
    },
  },
  ".remove": {
    textAlign: "center",
    color: "blue",
    ":hover": {
      textDecoration: "underline",
    },
  },
};
