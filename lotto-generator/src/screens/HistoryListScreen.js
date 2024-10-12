import { View, FlatList } from 'react-native';
import Header from '../components/Header/Header';
import Typography from '../components/common/Typography';
import LottoNumberView from '../components/LottoNumberView';
import { useSelector } from 'react-redux';

export default () => {
  const history = useSelector(state => state.numbers.history).reverse();

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title='HISTORY' />
      </Header>
      <FlatList
        style={{ flex: 1 }}
        data={history}
        contentContainerStyle={{
          paddingTop: 24,
          paddingBottom: 24,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 12,
              marginHorizontal: 24,
              height: 120,
              backgroundColor: 'white',
            }}
          >
            <Typography fontSize={16}>{item.date}</Typography>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <LottoNumberView
                numbers={item.numbers}
                isHistory
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};
