const getCurrentYear = (): string => {
  const todaysDate = new Date().toISOString().slice(0, 19).replace(/T.*/, "");
  const currentYear = todaysDate.split("-")[0];
  return currentYear;
};

export default getCurrentYear;
