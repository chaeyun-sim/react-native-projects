import { FlatList, View } from 'react-native';
import Header from '../components/Header/Header';
import { IMAGE_LIST } from '../constants';
import PhotoListItem from '../components/PhotoListItem';

export default () => {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title='IMAGE LIST' />
        </Header.Group>
      </Header>
      <FlatList
        style={{ flex: 1 }}
        data={IMAGE_LIST}
        renderItem={({ item }) => <PhotoListItem url={item} />}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </View>
  );
};
