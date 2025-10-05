import { format } from 'date-fns';

// Format a date for input fields
export const formatDateForInput = (date: Date) => format(date, 'yyyy-MM-dd');

// Format a date as 'MMMM yyyy'
export const formatMonthYear = (date: Date) => format(date, 'MMMM yyyy');

// Format a date as day of month
export const formatDayOfMonth = (date: Date) => format(date, 'd');

// Parse a meeting date string to Date
export const parseMeetingDate = (dateStr: string) => new Date(dateStr);

// Get all days in the month for a given date
export const getDaysInMonth = (date: Date): Date[] => {
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const days: Date[] = [];
  for (let d = new Date(monthStart); d <= monthEnd; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  return days;
};
