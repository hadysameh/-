const isObjEmpty = (obj: any): boolean => {
  //if array length is zero returns false as false == 0
  if (Object.keys(obj).length) {
    return false;
  }
  return true;
};
export default isObjEmpty;
