const addDaysToDate = (date: string, numOfDays: any) => {
  let tempDate = new Date(date);
  tempDate.setDate(tempDate.getDate() + Number(numOfDays));
  let result = new Date(tempDate).toISOString().slice(0, 19).replace(/T.*/, "");
  //   console.log({ result });
  return result;
};
export default addDaysToDate;
