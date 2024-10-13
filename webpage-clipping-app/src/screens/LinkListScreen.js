import { useMemo, useCallback } from 'react';
import { SectionList, View, Animated, Alert } from 'react-native';
import Typography from '../components/common/Typography';
import Button from '../components/common/Button';
import Header from '../components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import Spacer from '../components/common/Spacer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icons from '../components/common/Icons';
import { Swipeable } from 'react-native-gesture-handler';
import { useLinkList } from 'src/hooks/useLinkList';
import ExternalImages from 'src/components/common/ExternalImages';

export default () => {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();
  const { linkList, deleteLink } = useLinkList();

  const onPressListItem = item => navigation.navigate('LinkDetail', { item });
  const onPressAddButton = () => navigation.navigate('AddLink');

  const sectionData = useMemo(() => {
    const makeDateString = createdAt => {
      const date = new Date(createdAt);
      if (isNaN(date.getTime())) return 'Invalid Date';
      const newDate = date
        .toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
        .replace(/\. /g, '.')
        .replace(/, /g, ' ');
      return `${newDate.slice(0, 10)} ${newDate.slice(11)}`;
    };
    const safeList = Array.isArray(linkList) ? linkList : [];

    const sortedList = safeList.sort((a, b) => a.createdAt - b.createdAt);

    return Object.entries(
      sortedList.reduce((acc, item) => {
        const keyName = makeDateString(item.createdAt);
        acc[keyName] = [...(acc[keyName] || []), item];
        return acc;
      }, {})
    ).map(([title, data]) => ({ title, data }));
  }, [linkList]);

  const onPressDelete = useCallback(
    item => {
      Alert.alert('삭제하시겠습니까?', '', [
        {
          text: '취소',
          onPress: () => {},
        },
        {
          text: '삭제하기',
          onPress: () => deleteLink(item),
        },
      ]);
    },
    [deleteLink]
  );

  const renderLeftActions = (item, index) => {
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
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title='LINK LIST' />
        </Header.Group>
      </Header>
      <SectionList
        style={{ flex: 1 }}
        sections={sectionData}
        renderItem={({ item }) => {
          return (
            <Swipeable
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
        }}
        renderSectionHeader={({ section }) => {
          return (
            <View style={{ paddingHorizontal: 12, paddingVertical: 4, backgroundColor: 'white' }}>
              <Typography
                color='gray'
                fontSize={12}
              >
                {section.title}
              </Typography>
            </View>
          );
        }}
      />
      <View style={{ position: 'absolute', right: 24, bottom: 24 + safeAreaInsets.bottom }}>
        <Button onPress={onPressAddButton}>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
            }}
          >
            <Icons
              name='add'
              color='white'
              size={32}
            />
          </View>
        </Button>
      </View>
    </View>
  );
};
