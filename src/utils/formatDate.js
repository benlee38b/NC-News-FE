export const formatDate = (date) => {
  let formattedDate = '';
  console.log(date);
  const regex = /[a-zA-Z]/g;
  let dateArr = date.split('');
  for (let i = 0; i < dateArr.length; i++) {
    if (regex.test(date[i])) {
      formattedDate = dateArr.slice(0, i);
    }
  }
  return formattedDate.join('');
};
