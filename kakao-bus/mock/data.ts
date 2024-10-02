import { BusStop } from '@/types/types';
import dayjs from 'dayjs';

export const busStop: BusStop = {
  id: 23284,
  name: '강남역12번출구',
  directionDescription: '강남역.강남역사거리',
  isBookmarked: true,
  buses: [
    {
      type: 'B',
      num: 146,
      directionDescription: '강남역.강남역사거리',
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(8, 'minute'),
          numsOfRemainedStops: 5,
          numsOfPassengers: 3,
        },
        {
          arrivalTime: dayjs().add(21, 'minute').add(3, 'second'),
          numsOfRemainedStops: 11,
          numsOfPassengers: 5,
        },
      ],
    },
    {
      type: 'B',
      num: 360,
      directionDescription: '지하철2호선강남역',
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(50, 'second'),
          numsOfRemainedStops: 1,
          numsOfPassengers: 32,
        },
        {
          arrivalTime: dayjs().add(10, 'minute').add(30, 'second'),
          numsOfRemainedStops: 6,
          numsOfPassengers: 25,
        },
      ],
    },
    {
      type: 'B',
      num: 740,
      directionDescription: '강남역.강남역사거리',
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(1, 'minute').add(5, 'second'),
          numsOfRemainedStops: 1,
          numsOfPassengers: 22,
        },
        {
          arrivalTime: dayjs().add(14, 'minute'),
          numsOfRemainedStops: 5,
          numsOfPassengers: 8,
        },
      ],
    },
    {
      type: 'G',
      num: 3412,
      directionDescription: '강남역',
      isBookmarked: true,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(5, 'minute').add(10, 'second'),
          numsOfRemainedStops: 4,
          numsOfPassengers: 8,
        },
        {
          arrivalTime: dayjs().add(18, 'minute').add(14, 'second'),
          numsOfRemainedStops: 18,
          numsOfPassengers: 16,
        },
      ],
    },
    {
      type: 'R',
      num: 1100,
      directionDescription: '지하철2호선.강남역(중)',
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(70, 'minute'),
          numsOfRemainedStops: 42,
          numsOfPassengers: 3,
        },
      ],
    },
    {
      type: 'R',
      num: 1700,
      directionDescription: '강남역.강남역사거리',
      isBookmarked: true,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(12, 'minute'),
          numsOfRemainedStops: 7,
          numsOfPassengers: 39,
        },
        {
          arrivalTime: dayjs().add(44, 'minute').add(10, 'second'),
          numsOfRemainedStops: 22,
          numsOfPassengers: 4,
        },
      ],
    },
    {
      type: 'R',
      num: 2000,
      directionDescription: '강남역.강남역사거리',
      isBookmarked: false,
      nextBusInfos: [],
    },
    {
      type: 'R',
      num: 3600,
      directionDescription: '지하철2호선.강남역(중)',
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(11, 'minute').add(44, 'second'),
          numsOfRemainedStops: 6,
          numsOfPassengers: 11,
        },
        {
          arrivalTime: dayjs().add(39, 'minute').add(42, 'second'),
          numsOfRemainedStops: 14,
          numsOfPassengers: 10,
        },
      ],
    },
    {
      type: 'R',
      num: 7007,
      directionDescription: '강남역.강남역사거리',
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(9, 'minute').add(23, 'second'),
          numsOfRemainedStops: 5,
          numsOfPassengers: 2,
        },
        {
          arrivalTime: dayjs().add(24, 'minute').add(50, 'second'),
          numsOfRemainedStops: 12,
          numsOfPassengers: 2,
        },
      ],
    },
    {
      type: 'R',
      num: 8001,
      directionDescription: '지하철2호선.강남역(중)',
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(20, 'minute').add(48, 'second'),
          numsOfRemainedStops: 10,
          numsOfPassengers: 3,
        },
      ],
    },
    {
      type: 'R',
      num: 9303,
      directionDescription: '강남역.강남역사거리',
      isBookmarked: true,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(20, 'minute').add(48, 'second'),
          numsOfRemainedStops: 10,
          numsOfPassengers: 20,
        },
      ],
    },
    {
      type: 'R',
      num: 9600,
      directionDescription: '강남역.강남역사거리',
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(28, 'minute').add(7, 'second'),
          numsOfRemainedStops: 16,
          numsOfPassengers: 6,
        },
      ],
    },
  ],
};
