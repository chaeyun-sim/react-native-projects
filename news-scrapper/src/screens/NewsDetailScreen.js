import { View } from 'react-native';
import Header from '../components/common/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { clipNewsItem } from '../actions/news';
import { removeKeywordTag } from '../utils/removeTags';

export default () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressBack = () => navigation.goBack();
  const onPressFavorite = () => dispatch(clipNewsItem(route.params.item));

  const favoriteNews = useSelector(state => state.news.favoriteNews);
  const isClipped = favoriteNews.findIndex(item => item.link === route.params.item.link);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Icon
          iconName='arrow-back'
          onPress={onPressBack}
        />
        <Header.Title
          title={removeKeywordTag(
            route.params.item.title.length > 17
              ? route.params.item.title.slice(0, 17) + '...'
              : route.params.item.title
          )}
        />
        <Header.Icon
          iconName={isClipped === -1 ? 'heart-outline' : 'heart'}
          onPress={onPressFavorite}
        />
      </Header>
      <WebView
        startInLoadingState
        style={{ flex: 1 }}
        source={{ uri: route.params.item.link }}
      />
    </View>
  );
};
