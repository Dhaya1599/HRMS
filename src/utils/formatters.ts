import { format, parseISO, differenceInDays, isToday, isYesterday } from 'date-fns';

export const formatDate = (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch {
    return 'Invalid date';
  }
};

export const formatTime = (time: string | Date, formatStr: string = 'HH:mm'): string => {
  try {
    const dateObj = typeof time === 'string' ? parseISO(time) : time;
    return format(dateObj, formatStr);
  } catch {
    return 'Invalid time';
  }
};

export const formatDateTime = (
  dateTime: string | Date,
  formatStr: string = 'MMM dd, yyyy HH:mm'
): string => {
  try {
    const dateObj = typeof dateTime === 'string' ? parseISO(dateTime) : dateTime;
    return format(dateObj, formatStr);
  } catch {
    return 'Invalid date/time';
  }
};

export const formatRelativeDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (isToday(dateObj)) return 'Today';
    if (isYesterday(dateObj)) return 'Yesterday';
    const daysAgo = differenceInDays(new Date(), dateObj);
    if (daysAgo < 7) return `${daysAgo} days ago`;
    return format(dateObj, 'MMM dd');
  } catch {
    return 'Invalid date';
  }
};

export const formatDuration = (durationInMinutes: number): string => {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
};

export const calculateWorkDuration = (checkIn: string, checkOut: string): number => {
  try {
    const checkInTime = parseISO(checkIn);
    const checkOutTime = parseISO(checkOut);
    return Math.floor((checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60));
  } catch {
    return 0;
  }
};

export const formatLeaveBalance = (balance: number): string => {
  const days = Math.floor(balance);
  const hours = Math.round((balance - days) * 8);
  if (days === 0) return `${hours}h`;
  if (hours === 0) return `${days}d`;
  return `${days}d ${hours}h`;
};

export const parseTimeString = (timeStr: string): Date => {
  try {
    return parseISO(timeStr);
  } catch {
    return new Date();
  }
};

export const formatTime12h = (time: string): string => {
  if (!time || time.trim() === '' || time === '—') return '—';
  const parts = time.split(':').map(Number);
  const h = parts[0] ?? 0;
  const m = parts[1] ?? 0;
  const hour12 = h % 12 || 12;
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${hour12}:${String(m).padStart(2, '0')} ${ampm}`;
};

export const formatHoursMinutes = (hours: number): string => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};
