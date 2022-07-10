const findItemsInList = (serchValue, arrList = [], fieldName = "title") => {
  // console.log(serchValue, arrList, fieldName, 37);
  const serachResultsArr = arrList.filter((item) => {
    // console.log(item[fieldName], serchValue, 39);
    // console.log(item[fieldName].includes(serchValue));
    return item[fieldName].toLowerCase().includes(serchValue.toLowerCase());
  });
  return serachResultsArr;
};

export default findItemsInList;
