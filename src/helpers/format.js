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
