import { View } from 'react-native';

import Header from '../components/common/Header';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title='Home' />
      </Header>
    </View>
  );
}
