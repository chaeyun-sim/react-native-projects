import { View } from 'react-native';

import Header from '../components/common/Header';

export default function AddFeeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title='ADD FEED' />
      </Header>
    </View>
  );
}
