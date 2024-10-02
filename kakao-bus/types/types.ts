import { Dayjs } from 'dayjs';

export type BusStop = {
  id: number;
  name: string;
  directionDescription: string;
  isBookmarked: boolean;
  buses: BusData[];
};

export type BusData = {
  num: number;
  type: 'B' | 'G' | 'R';
  directionDescription: string;
  isBookmarked: boolean;
  nextBusInfos: BusInfo[];
};

export type BusInfo = {
  arrivalTime: Dayjs;
  numsOfRemainedStops: number;
  numsOfPassengers: number;
};

export type ProcessedBusInfo = {
  hasInfo: boolean;
  remainedTimeText: string;
  numsOfRemainedStops?: number;
  seatStatusText?: string;
};
