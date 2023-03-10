export const formatDate = (date) => {
  const createdDate = new Date(date);

  const displayDate =
    createdDate.getDate() +
    "/" +
    (createdDate.getMonth() + 1) +
    "/" +
    createdDate.getFullYear();

  return displayDate;
};

// currently not being used
export const calculateDaysPassed = (date) => {
  const createdDate = new Date(date);
  const actualDate = new Date();
  const daysPassed = (
    (actualDate - createdDate) /
    1000 /
    60 /
    60 /
    24
  ).toFixed();
  return daysPassed;
};

import { useEffect, useState } from "react";

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };
