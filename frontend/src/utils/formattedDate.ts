export const getFormattedDate = (date: Date) => {
  const year = date?.getFullYear();
  const month = date ? String(date.getMonth() + 1).padStart(2, '0') : '';
  const day = date ? String(date.getDate()).padStart(2, '0') : '';
  return date ? `${year}-${month}-${day}` : '';
};
