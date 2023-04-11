/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import { useCountdown } from "../../helpers/time";

export const CountdownTimer = ({ date }) => {
  const finishDate = new Date(date);
  finishDate.setDate(finishDate.getDate() + 14);
  const [days, hours, minutes, seconds] = useCountdown(finishDate);
  return (
    <div css={countdownStyle}>
      <p>Time left to vote</p>
      <div
        className={`countdown ${
          days <= 0 && hours <= 3 ? "countdown__danger" : null
        }`}
      >
        <div>
          <p className="countdown__number">{days}</p>
          <p className="countdown__unit">days</p>
        </div>
        <div>
          <p className="countdown__number">{hours}</p>
          <p className="countdown__unit">hours</p>
        </div>
        <div>
          <p className="countdown__number">{minutes}</p>
          <p className="countdown__unit">minutes</p>
        </div>
        <div>
          <p className="countdown__number">{seconds}</p>
          <p className="countdown__unit">seconds</p>
        </div>
      </div>
    </div>
  );
};

const countdownStyle = {
  color: "#7E7E7E",
  ".countdown": {
    display: "flex",
    gap: "1.5rem",
    marginTop: "0.4rem",
  },
  ".countdown__number": {
    fontSize: "1.5rem",
    color: "black",
  },
  ".countdown__unit": {
    fontSize: "0.9rem",
  },
  ".countdown__danger > *": {
    ".countdown__number, .countdown__unit": {
      color: "red",
    },
  },
};
