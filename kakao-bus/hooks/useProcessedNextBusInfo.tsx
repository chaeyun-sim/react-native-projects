import { BusData } from '@/types/types';
import { getRemainedTimeText, getSeatStatusText } from '@/constants/data';
import { Dayjs } from 'dayjs';

export const useProcessedBusInfo = (now: Dayjs, bus: BusData) => {
  const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null;
  const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
  const newNextBusInfos =
    !firstNextBusInfo && !secondNextBusInfo ? [null] : [firstNextBusInfo, secondNextBusInfo];

  const processedNextBusInfo = newNextBusInfos.map(info => {
    if (!info)
      return {
        hasInfo: false,
        remainedTimeText: '도착 정보 없음',
      };

    const { arrivalTime, numsOfRemainedStops, numsOfPassengers } = info;
    const remainedTimeText = getRemainedTimeText(now, arrivalTime);
    const seatStatusText = getSeatStatusText(bus.type, numsOfPassengers);
    return {
      hasInfo: true,
      remainedTimeText,
      numsOfRemainedStops,
      seatStatusText,
    };
  });

  return processedNextBusInfo;
};
