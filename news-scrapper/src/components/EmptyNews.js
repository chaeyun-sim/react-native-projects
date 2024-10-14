import { useWindowDimensions, View } from 'react-native';
import Typography from './common/Typography';

export default ({ isFavorite }) => {
  const { height } = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        height: height * 0.75,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography fontSize={16}>
        {isFavorite ? '즐겨찾기한 뉴스가 없습니다.' : '뉴스를 검색해 주세요!'}
      </Typography>
    </View>
  );
};
