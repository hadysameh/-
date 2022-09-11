const getTodaysDate = (): string => {
  const todaysDate = new Date().toISOString().slice(0, 19).replace(/T.*/, "");
  return todaysDate;
};

export default getTodaysDate;
