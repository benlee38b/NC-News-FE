export const formatDate = (date) => {
  let formattedDate = '';
  let dateArr = date.split('');
  formattedDate = dateArr.slice(0, 10);
  return formattedDate.join('');
};
