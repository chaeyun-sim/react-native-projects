import dayjs, { Dayjs } from 'dayjs';

export const COLORS = {
  SUN: '#e67639',
  SAT: '#5872d1',
  DEFAULT: '#2b2b2b',
};

export const fillEmptyColumns = (columns: Dayjs[], start: Dayjs, end: Dayjs) => {
  const filledColumns = columns.slice(0);

  const startDay = dayjs(start).get('day');
  for (let i = 1; i <= startDay; i++) {
    const date = dayjs(start).subtract(i, 'day');
    filledColumns.unshift(date);
  }

  const endDay = dayjs(end).get('day');

  for (let i = 1; i <= 6 - endDay; i++) {
    const date = dayjs(end).add(i, 'day');
    filledColumns.push(date);
  }

  return filledColumns;
};

export const getCalendarColumns = (now: Dayjs) => {
  const start = dayjs(now).startOf('month');
  const end = dayjs(now).endOf('month');
  const endDate = dayjs(end).get('date');

  const columns = [];
  for (let i = 0; i < endDate; i++) {
    const date = dayjs(start).add(i, 'day');
    columns.push(date);
  }

  const filledColumns = fillEmptyColumns(columns, start, end);
  return filledColumns;
};

export const getDayText = (day: number) => {
  return ['월', '화', '수', '목', '금', '토', '일'][day];
};

export const getDayColor = (day: number) => {
  return day === 0 ? COLORS['SUN'] : day === 6 ? COLORS['SAT'] : COLORS['DEFAULT'];
};
