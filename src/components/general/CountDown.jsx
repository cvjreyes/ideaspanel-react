/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import { useCountdown } from "../../helpers/time";

export const CountdownTimer = ({ date }) => {
  const finishDate = new Date(date);
  finishDate.setDate(finishDate.getDate() + 14);
  const [days, hours, minutes, seconds] = useCountdown(finishDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <div css={countdownStyle}>
        <p>Time left to vote:</p>
        <ShowCounter d={days} h={hours} m={minutes} s={seconds} />
      </div>
    );
  }
};

const ShowCounter = ({ d, h, m, s }) => {
  return (
    <div className="show-counter flexCenter">
      <DateTimeDisplay value={d} type={"d"} isDanger={d <= 3} />
      <p>:</p>
      <DateTimeDisplay value={h} type={"h"} isDanger={d <= 3 && h <= 3} />
      <p>:</p>
      <DateTimeDisplay value={m} type={"m"} isDanger={d <= 3 && h < 1} />
      <p>:</p>
      <DateTimeDisplay
        value={s}
        type={"s"}
        isDanger={d <= 3 && h < 1 && m < 5}
      />
    </div>
  );
};

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className="countdown">
      <p className={isDanger ? "red" : ""}>{value}</p>
      <span className={isDanger ? "red" : ""}>{type}</span>
    </div>
  );
};

const ExpiredNotice = () => {
  return (
    <div css={expiredStyle} className="red">
      Tonight this idea is going to be validated
    </div>
  );
};

const countdownStyle = {
  fontWeight: 700,
  width: "300px",
  "> p": {
    fontSize: "1.2rem",
  },
  ".show-counter": {
    border: "1px solid #ebebeb",
    borderRadius: "0.25rem",
    width: "fit-content",
    margin: "10px auto 0",
    ".countdown": {
      padding: "0.5rem 1rem",
      display: "flex",
    },
  },
};

const expiredStyle = {
  margin: "2.5rem 0 0",
};
