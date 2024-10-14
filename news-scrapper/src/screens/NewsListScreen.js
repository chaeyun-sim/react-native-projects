import { useState, useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
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
  const data = useSelector(state => state.news.newsList);

  const [query, setQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [showColon, setShowColon] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (data.items) {
      if (page === 1) {
        setNewsList(data.items);
      } else {
        setNewsList(prev => [...prev, ...data.items]);
      }
      setHasMore(data.items.length > 0);
    }
  }, [data, page]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}${showColon ? ':' : ' '}${minutes}`);
    };

    const toggleColon = () => setShowColon(prev => !prev);

    updateTime();

    const timeInterval = setInterval(updateTime, 500);
    const colonInterval = setInterval(toggleColon, 500);

    return () => {
      clearInterval(timeInterval);
      clearInterval(colonInterval);
    };
  }, [showColon]);

  const onDispatch = useCallback(
    pageNumber => {
      if (!query || isLoading || !hasMore) return;
      setIsLoading(true);
      dispatch(getNewsList(query, pageNumber))
        .then(result => {
          if (pageNumber === 1) {
            setNewsList(result.items);
          } else {
            setNewsList(prevList => {
              const newItems = result.items.filter(
                item => !prevList.some(prevItem => prevItem.link === item.link)
              );
              return [...prevList, ...newItems];
            });
          }
          setHasMore(result.items.length === 10);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    },
    [query, isLoading, hasMore, dispatch]
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    setNewsList([]);
    setHasMore(true);
    onDispatch(1);
    setTimeout(() => setRefreshing(false), 100);
  }, [onDispatch]);

  const onPressItem = item => navigation.navigate('NewsDetail', { item });

  const onSubmitEditing = useCallback(() => {
    if (!query) return;
    setNewsList([]);
    setPage(1);
    setHasMore(true);
    onDispatch(1);
  }, [query, onDispatch]);

  const onEndReached = () => {
    if (!isLoading) {
      setPage(prevPage => {
        const nextPage = prevPage + 1;
        onDispatch(nextPage);
        return nextPage;
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header style={{ flex: 1 }}>
        <Header.Title title='오늘의 뉴스' />
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
        <FlatList
          style={{ flex: 1 }}
          data={newsList}
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
          onEndReached={onEndReached}
          onEndReachedThreshold={0.6}
          ListFooterComponent={() => isLoading && <ActivityIndicator />}
        />
      </View>
    </View>
  );
};
