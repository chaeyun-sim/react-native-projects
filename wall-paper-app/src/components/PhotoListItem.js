import { useState } from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import Button from './common/Button';
import ExternalImages from './common/ExternalImages';
import { useNavigation } from '@react-navigation/native';

export default ({ url }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [animValue] = useState(new Animated.Value(0));

  const onPressItem = () => navigation.navigate('ImageDetail', { url });
  const onPressIn = () => {
    Animated.timing(animValue, {
      duration: 200,
      toValue: 1,
      useNativeDriver: true, // 이 줄을 추가
    }).start();
  };
  const onPressOut = () => {
    Animated.timing(animValue, {
      duration: 200,
      toValue: 0,
      useNativeDriver: true, // 이 줄을 추가
    }).start();
  };

  const scale = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1.0, 0.95],
  });

  return (
    <Button
      onPress={onPressItem}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      opacity={0.8}
      style={{
        paddingHorizontal: 15,
        paddingVertical: 10,
      }}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <ExternalImages
          url={url}
          width={width - 30}
          height={(width - 30) * 1.2}
          style={{ transform: [{ scale: 1 }] }}
        />
      </Animated.View>
    </Button>
  );
};
