import { useMemo } from 'react';
import { FlatList, SectionList, View } from 'react-native';
import Typography from '../components/common/Typography';
import Button from '../components/common/Button';
import Header from '../components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import Spacer from '../components/common/Spacer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icons from '../components/common/Icons';
import { useRecoilValue } from 'recoil';
import { atomLinkList } from '../states/atomLinkList';

export default () => {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();
  const linkList = useRecoilValue(atomLinkList);

  const onPressListItem = item => navigation.navigate('LinkDetail', { item });
  const onPressAddButton = () => navigation.navigate('AddLink');

  const sectionData = useMemo(() => {
    const makeDateString = createdAt => {
      const date = new Date(createdAt);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date
        .toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
        .replace(/\. /g, '.')
        .replace(/, /g, ' ');
    };
    return Object.entries(
      (linkList.list || []).reduce((acc, item) => {
        const keyName = makeDateString(item.createdAt);
        acc[keyName] = [...(acc[keyName] || []), item];
        return acc;
      }, {})
    )
      .map(([title, data]) => ({ title, data }))
      .reverse();
  }, [linkList.list]);

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
        renderItem={({ item }) => (
          <Button
            onPress={() => onPressListItem(item)}
            style={{ padding: 24 }}
          >
            <View>
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
          </Button>
        )}
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
