import { View } from 'react-native';

import Header from '../components/common/Header';

export default function MyPageScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title='My Page' />
      </Header>
    </View>
  );
}
