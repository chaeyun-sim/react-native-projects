import { useState, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import Header from '../components/common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsList } from '../actions/news';
import SingleLineInput from '../components/common/SingleLineInput';
import { useNavigation } from '@react-navigation/native';
import NewsItem from '../components/NewsItem';
import EmptyNews from '../components/EmptyNews';

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const newsList = useSelector(state => state.news.newsList);
  const [query, setQuery] = useState('');

  const onPressItem = item => navigation.navigate('NewsDetail', { item });
  const onSubmitEditing = useCallback(() => {
    if (!query) return;
    dispatch(getNewsList(query));
  });

  return (
    <View style={{ flex: 1 }}>
      <Header style={{ flex: 1 }}>
        <Header.Title title='오늘의 뉴스' />
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
          data={newsList.items}
          renderItem={({ item }) => (
            <NewsItem
              item={item}
              onPressItem={() => onPressItem(item)}
            />
          )}
          ListEmptyComponent={EmptyNews}
        />
      </View>
    </View>
  );
};
