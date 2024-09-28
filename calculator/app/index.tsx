import { useCalculator } from '@/hooks/useCalculator';
import { Text, TouchableOpacity, View } from 'react-native';
import { styled } from 'styled-components/native';

const COLOR = {
  RESULT: '#4e4c51',
  RESET: '#5f5e62',
  OPERATOR: '#f39c29',
  NUM: '#888595',
};

type ButtonProps = {
  text: string;
  onPress: () => void;
  flex: number;
  type: string;
  isSelected?: boolean;
};

const Button = ({ text, onPress, flex, type }: ButtonProps) => {
  return (
    <InnerButton
      style={{
        backgroundColor: COLOR[type.toUpperCase() as keyof typeof COLOR],
        flex,
      }}
      onPress={onPress}
    >
      <Text style={{ color: 'white', fontSize: 25 }}>{text}</Text>
    </InnerButton>
  );
};

export default function HomeScreen() {
  const { input, onPressNum, onPressOperator, onPressReset } = useCalculator();

  return (
    <Container>
      <View style={{ flex: 1, width: 250 }}>
        <InputContainer>
          <Text style={{ color: 'white', fontSize: 35, textAlign: 'right' }}>{input}</Text>
        </InputContainer>
        <ButtonContainer>
          <Button
            type='reset'
            text={Number(input) > 0 ? 'AC' : 'C'}
            onPress={onPressReset}
            flex={3}
          />
          <Button
            type='operator'
            text='/'
            onPress={() => onPressOperator('/')}
            flex={1}
          />
        </ButtonContainer>
        <ButtonContainer>
          {[7, 8, 9].map(item => (
            <Button
              key={item}
              type={'num'}
              text={String(item)}
              onPress={() => onPressNum(item)}
              flex={1}
            />
          ))}
          <Button
            type='operator'
            text='*'
            onPress={() => onPressOperator('*')}
            flex={1}
          />
        </ButtonContainer>
        <ButtonContainer>
          {[4, 5, 6].map(item => (
            <Button
              key={item}
              type={'num'}
              text={String(item)}
              onPress={() => onPressNum(item)}
              flex={1}
            />
          ))}
          <Button
            type='operator'
            text='-'
            onPress={() => onPressOperator('-')}
            flex={1}
          />
        </ButtonContainer>
        <ButtonContainer>
          {[1, 2, 3].map(item => (
            <Button
              key={item}
              type={'num'}
              text={String(item)}
              onPress={() => onPressNum(item)}
              flex={1}
            />
          ))}
          <Button
            type='operator'
            text='+'
            onPress={() => onPressOperator('+')}
            flex={1}
          />
        </ButtonContainer>
        <ButtonContainer>
          <Button
            type={'num'}
            text={'0'}
            onPress={() => onPressNum(0)}
            flex={2}
          />
          <Button
            type={'num'}
            text={'.'}
            onPress={() => onPressNum('.')}
            flex={1}
          />
          <Button
            type='operator'
            text='='
            onPress={() => onPressOperator('=')}
            flex={1}
          />
        </ButtonContainer>
      </View>
    </Container>
  );
}

const Container = styled(View)({
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

const ButtonContainer = styled(View)`
  flex-direction: row;
  width: 100%;
`;

const InputContainer = styled(View)`
  background-color: ${COLOR.RESULT};
  min-height: 50px;
  justify-content: center;
  padding: 10px;
`;

const InnerButton = styled(TouchableOpacity)({
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 15,
  borderWidth: 0.2,
  borderColor: 'black',
});
