import { View } from 'react-native';

import Header from '../components/common/Header';

export default function FeedListScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title='FEED LIST' />
      </Header>
    </View>
  );
}
