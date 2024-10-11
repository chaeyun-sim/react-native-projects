import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import PhotoListItem from '../components/PhotoListItem';

export default () => {
  const imageList = useSelector(state => state.favorite.favoriteList);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title='FAVORITE IMAGE' />
        </Header.Group>
      </Header>
      <FlatList
        style={{ flex: 1 }}
        data={imageList}
        renderItem={({ item }) => <PhotoListItem url={item} />}
      />
    </View>
  );
};
