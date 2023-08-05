import { format } from 'date-fns';

export const getFormattedDate = (date: Date) => {
  if (!date) return '';

  return format(date, 'yyyy-MM-dd');
};
