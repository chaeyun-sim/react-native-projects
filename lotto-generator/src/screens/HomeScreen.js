import { View } from 'react-native';
import Header from '../components/Header/Header';
import Spacer from '../components/common/Spacer';
import Button from '../components/common/Button';
import Typography from '../components/common/Typography';
import LottoNumberView from '../components/LottoNumberView';
import { useDispatch, useSelector } from 'react-redux';
import { createNewNumbers } from '../actions/lottoNumbers';

export default () => {
  const dispatch = useDispatch();
  const numbers = useSelector(state => state.numbers.currentNumber);

  const onPressGetNumber = () => dispatch(createNewNumbers());

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title={'HOME'} />
      </Header>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          paddingHorizontal: 12,
        }}
      >
        <View
          style={{
            height: 250,
            flexDirection: 'column',
            justifyContent: 'center',
            paddingHorizontal: 24,
            backgroundColor: 'white',
            borderColor: 'gray',
          }}
        >
          <LottoNumberView numbers={numbers} />
        </View>
        <Spacer space={20} />
        <Button onPress={onPressGetNumber}>
          <View style={{ backgroundColor: 'black', paddingVertical: 24, alignItems: 'center' }}>
            <Typography
              color='white'
              fontSize={18}
            >
              로또 번호 추출하기
            </Typography>
          </View>
        </Button>
      </View>
    </View>
  );
};
