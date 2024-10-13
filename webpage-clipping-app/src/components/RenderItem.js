import { useCallback, useRef } from 'react';
import { Alert, Animated, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import ExternalImages from './common/ExternalImages';
import Typography from './common/Typography';
import Spacer from './common/Spacer';
import { useNavigation } from '@react-navigation/native';
import { useLinkList } from 'src/hooks/useLinkList';
import Button from './common/Button';
import Icons from './common/Icons';

export default ({ item }) => {
  const swipeRef = useRef(null);
  const navigation = useNavigation();
  const { deleteLink } = useLinkList();

  const onSwipeClose = () => swipeRef.current.close();

  const onPressListItem = item => {
    navigation.navigate('LinkDetail', { item });
    onSwipeClose();
  };

  const onPressDelete = useCallback(
    item => {
      Alert.alert('삭제하시겠습니까?', '', [
        {
          text: '취소',
          onPress: onSwipeClose,
        },
        {
          text: '삭제하기',
          onPress: () => deleteLink(item),
        },
      ]);
    },
    [deleteLink]
  );

  const renderLeftActions = item => {
    return (
      <Button
        onPress={() => onPressListItem(item)}
        style={{
          width: 70,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'lightgray',
        }}
      >
        <Animated.View>
          <Typography fontSize={16}>링크</Typography>
          <Spacer space={10} />
          <Typography fontSize={16}>열기</Typography>
        </Animated.View>
      </Button>
    );
  };

  const renderRightActions = (item, index) => {
    return (
      <View
        style={{
          width: 70,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'crimson',
        }}
      >
        <Button onPress={() => onPressDelete(item)}>
          <Animated.View>
            <Icons
              name='trash'
              color='white'
              size={24}
            />
          </Animated.View>
        </Button>
      </View>
    );
  };

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={() => renderRightActions(item)}
      renderLeftActions={() => renderLeftActions(item)}
      rightThreshold={40}
    >
      <View
        style={{
          padding: 24,
          backgroundColor: '#f2f2f2',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ExternalImages
          url={item.image}
          width={60}
          height={60}
          style={{ borderRadius: 6 }}
        />
        <View style={{ marginLeft: 15 }}>
          <Typography fontSize={20}>{item.link}</Typography>

          <Spacer space={4} />

          {item.title && (
            <Typography
              fontSize={16}
              color='gray'
            >
              {item.title ? item.title.slice(0, 20) : ''}
            </Typography>
          )}
          <Spacer space={4} />
          <Typography
            fontSize={16}
            color='gray'
          >
            {new Date(item.createdAt).toLocaleString()}
          </Typography>
        </View>
      </View>
    </Swipeable>
  );
};
