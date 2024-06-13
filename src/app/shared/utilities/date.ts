export const convertToDateTimeLocalString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const getDateString = (date: Date) =>
  convertToDateTimeLocalString(date).split('T')[0];

export const getTimeString = (date: Date) =>
  convertToDateTimeLocalString(date).split('T')[1];

export const joinDateAndTime = (date: string, time: string) =>
  [date, time].join('T');

export const getOneMoreHourFromNow = () => {
  let now = new Date();
  now.setHours(now.getHours() + 1);
  return now;
};
