import { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import Header from '../components/common/Header';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import NewsItem from '../components/NewsItem';
import EmptyNews from '../components/EmptyNews';
import { clippedTabFocus } from '../actions/news';

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isFocused = useIsFocused();
  const favoriteNews = useSelector(state => state.news.favoriteNews) || [];

  const onPressItem = item => navigation.navigate('NewsDetail', { item });

  useEffect(() => {
    if (isFocused) {
      dispatch(clippedTabFocus());
    }
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title='FAVORITE NEWS LIST' />
      </Header>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        data={favoriteNews}
        keyExtractor={item => item.link}
        renderItem={({ item }) => (
          <NewsItem
            item={item}
            onPressItem={() => onPressItem(item)}
          />
        )}
        ListEmptyComponent={() => <EmptyNews isFavorite />}
      />
    </View>
  );
};
