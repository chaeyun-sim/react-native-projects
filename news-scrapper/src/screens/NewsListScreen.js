import { useState, useCallback, useEffect } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import Header from '../components/common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsList } from '../actions/news';
import SingleLineInput from '../components/common/SingleLineInput';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import NewsItem from '../components/NewsItem';
import EmptyNews from '../components/EmptyNews';

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const newsList = useSelector(state => state.news.newsList);
  const [query, setQuery] = useState('');
  // TODO: 고도화 시 적용
  const [currentTime, setCurrentTime] = useState('');
  const [showColon, setShowColon] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // TODO: 고도화 시 적용
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}${showColon ? ':' : ' '}${minutes}`);
    };

    const toggleColon = () => {
      setShowColon(prev => !prev);
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 500);

    const colonInterval = setInterval(toggleColon, 500);

    return () => {
      clearInterval(timeInterval);
      clearInterval(colonInterval);
    };
  }, [showColon]);

  // TODO: 고도화 시 적용
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getNewsList(query));
    setTimeout(() => setRefreshing(false), 100);
  }, [dispatch, query]);

  const onPressItem = item => navigation.navigate('NewsDetail', { item });
  const onSubmitEditing = useCallback(() => {
    if (!query) return;
    dispatch(getNewsList(query));
  });

  return (
    <View style={{ flex: 1 }}>
      <Header style={{ flex: 1 }}>
        <Header.Title title='오늘의 뉴스' />
        {/* // TODO: 고도화 시 적용 */}
        <Header.Group style={{ gap: 6, justifyContent: 'flex-end' }}>
          <Feather
            name='clock'
            size={20}
            color='black'
          />
          <Header.Title
            title={currentTime}
            fontSize={16}
          />
        </Header.Group>
      </Header>
      <View style={{ flex: 1 }}>
        <View>
          <SingleLineInput
            value={query}
            onChangeText={setQuery}
            placeholder='뉴스 검색어를 입력해 주세요.'
            onSubmitEditing={onSubmitEditing}
          />
        </View>
        {/*  TODO: 끌어당기면 업데이트 만들기 */}
        <FlatList
          style={{ flex: 1 }}
          data={newsList.items}
          renderItem={({ item }) => (
            <NewsItem
              item={item}
              onPressItem={() => onPressItem(item)}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ListEmptyComponent={EmptyNews}
        />
      </View>
    </View>
  );
};
