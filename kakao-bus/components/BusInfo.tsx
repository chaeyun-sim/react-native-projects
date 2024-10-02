import { Text, View } from 'react-native';
import BookmarkButton from './BookmarkButton';
import AlarmButton from './AlarmButton';
import NextBusInfo from './NextBusInfo';
import { ProcessedBusInfo } from '@/types/types';
import { useContext } from 'react';
import { ThemeContext } from '@/hooks/context';

interface BusInfoProps {
  isBookmarked: boolean;
  busNum: number;
  directionDescription: string;
  busNumColor: string;
  processedNextBusInfo: ProcessedBusInfo[];
}

export default ({
  isBookmarked,
  busNum,
  directionDescription,
  busNumColor,
  processedNextBusInfo,
}: BusInfoProps) => {
  const COLOR = useContext(ThemeContext);

  return (
    <View style={{ flexDirection: 'row', backgroundColor: COLOR.WHITE, height: 75 }}>
      <View style={{ flex: 0.85, flexDirection: 'row', alignItems: 'center' }}>
        <BookmarkButton
          size={20}
          isBookmarked={isBookmarked}
          style={{ paddingHorizontal: 10 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ color: busNumColor, fontSize: 18 }}>{busNum}</Text>
          <Text style={{ fontSize: 12, color: COLOR.GRAY[300], marginRight: 5 }}>
            {directionDescription}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 1 }}>
          {processedNextBusInfo.map((info, idx) => (
            <NextBusInfo
              key={idx}
              hasInfo={info.hasInfo}
              remainedTimeText={info.remainedTimeText}
              numsOfRemainedStops={info.numsOfRemainedStops}
              seatStatusText={info.seatStatusText}
            />
          ))}
        </View>
        <AlarmButton
          onPress={() => null}
          style={{ padding: 15 }}
        />
      </View>
    </View>
  );
};
