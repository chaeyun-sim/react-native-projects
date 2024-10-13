import { useMemo } from 'react';
import { SectionList, View } from 'react-native';
import Typography from '../components/common/Typography';
import Button from '../components/common/Button';
import Header from '../components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icons from '../components/common/Icons';
import { useLinkList } from 'src/hooks/useLinkList';
import RenderItem from 'src/components/RenderItem';

export default () => {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();
  const { linkList } = useLinkList();

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

    return Object.entries(
      safeList.reduce((acc, item) => {
        const keyName = makeDateString(item.createdAt);
        acc[keyName] = [...(acc[keyName] || []), item];
        return acc;
      }, {})
    )
      .map(([title, data]) => ({ title, data }))
      .reverse();
  }, [linkList]);

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
        renderItem={RenderItem}
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
