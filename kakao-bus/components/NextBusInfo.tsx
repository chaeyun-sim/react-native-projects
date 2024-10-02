import { ThemeContext } from '@/hooks/context';
import { useContext } from 'react';
import { Text, View } from 'react-native';

interface NextBusInfoProps {
  hasInfo: boolean;
  remainedTimeText: string;
  numsOfRemainedStops?: number;
  seatStatusText?: string;
}

export default ({
  hasInfo = false,
  remainedTimeText,
  numsOfRemainedStops,
  seatStatusText,
}: NextBusInfoProps) => {
  const COLOR = useContext(ThemeContext);

  if (!hasInfo) return <Text style={{ color: COLOR.GRAY[200], fontSize: 12 }}>도착 정보 없음</Text>;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ color: COLOR.BLACK, marginRight: 10 }}>{remainedTimeText}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 0.4,
          borderColor: COLOR.GRAY[100],
          borderRadius: 3,
          padding: 2,
        }}
      >
        <Text style={{ color: COLOR.GRAY[300], fontSize: 12, marginRight: 3 }}>
          {numsOfRemainedStops}번째전
        </Text>
        <Text style={{ color: COLOR.CORAL, fontSize: 12 }}>{seatStatusText}</Text>
      </View>
    </View>
  );
};
