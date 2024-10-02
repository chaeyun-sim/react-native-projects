import { ThemeContext } from '@/hooks/context';
import { BusData } from '@/types/types';
import dayjs, { Dayjs } from 'dayjs';
import { useContext } from 'react';

export const getSections = (buses: BusData[]) => {
  const bBuses = [];
  const gBuses = [];
  const rBuses = [];

  for (const bus of buses) {
    if (bus.type === 'B') bBuses.push(bus);
    else if (bus.type === 'G') gBuses.push(bus);
    else if (bus.type === 'R') rBuses.push(bus);
  }

  const sections = [];
  if (bBuses.length > 0) {
    sections.push({
      title: '간선버스',
      data: bBuses,
    });
  }
  if (gBuses.length > 0) {
    sections.push({
      title: '지선버스',
      data: gBuses,
    });
  }
  if (rBuses.length > 0) {
    sections.push({
      title: '직행버스',
      data: rBuses,
    });
  }

  return sections;
};

export const getBusNumColorByType = (type: 'B' | 'G' | 'R' | undefined) => {
  const COLOR = useContext(ThemeContext);

  switch (type) {
    case 'B':
      return COLOR.BUS.B;
    case 'G':
      return COLOR.BUS.G;
    case 'R':
      return COLOR.BUS.R;
    default:
      return 'transparent';
  }
};

export const getRemainedTimeText = (now: Dayjs, arrivalTime: Dayjs) => {
  const remainMinute = dayjs(arrivalTime).diff(dayjs(now), 'minute');
  const remainSecond = dayjs(arrivalTime).diff(dayjs(now), 'second') % 60;

  if (remainMinute <= 0 && remainSecond <= 0) return '도착 또는 출발';
  if (remainMinute <= 0 && remainSecond < 30) return '곧 도착';
  if (remainMinute <= 0) return `${remainSecond}초`;
  return `${remainMinute}분 ${remainSecond}초`;
};

const MAX_SEAT_NUM_OF_R = 45;
export const getSeatStatusText = (type: 'R' | 'B' | 'G' | undefined, numsOfPassengers: number) => {
  switch (type) {
    case 'B':
    case 'G':
      return numsOfPassengers >= 30 ? '혼잡' : numsOfPassengers >= 20 ? '보통' : '여유';
    case 'R':
      return `${MAX_SEAT_NUM_OF_R - numsOfPassengers}석`;
    default:
      return 'transparent';
  }
};
