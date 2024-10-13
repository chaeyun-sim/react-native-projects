import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/Header/Header';
import { View } from 'react-native';
import WebView from 'react-native-webview';

export default () => {
  const route = useRoute();
  const navigation = useNavigation();

  const title = route.params.item.title;

  const onPressBack = () => navigation.goBack();

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Icon
          iconName='arrow-back'
          onPress={onPressBack}
        />
        <Header.Title title={title.length > 15 ? title.slice(0, 15) + '...' : title} />
        <Header.Space space={28} />
      </Header>

      <WebView
        startInLoadingState
        style={{ flex: 1 }}
        source={{ uri: route.params.item.link }}
      />
    </View>
  );
};
