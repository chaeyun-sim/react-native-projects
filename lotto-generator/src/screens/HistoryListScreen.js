import { View, FlatList, TouchableOpacity } from 'react-native';
import Header from '../components/Header/Header';
import Typography from '../components/common/Typography';
import LottoNumberView from '../components/LottoNumberView';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/common/Button';
import { clearHistory } from '../actions/lottoNumbers';

export default () => {
  const dispatch = useDispatch();
  const history = useSelector(state => state.numbers.history).reverse();
  const onClickClear = () => dispatch(clearHistory());

  if (!history.length) {
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Header.Title title='HISTORY' />
        </Header>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Typography fontSize={18}>기록이 없습니다.</Typography>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title='HISTORY' />
      </Header>
      {history.length > 0 && (
        <Button
          onPress={onClickClear}
          style={{ paddingRight: 24, marginTop: 20 }}
        >
          <Typography style={{ textAlign: 'right' }}>기록 삭제하기</Typography>
        </Button>
      )}
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
