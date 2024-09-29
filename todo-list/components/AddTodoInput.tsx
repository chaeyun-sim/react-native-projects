import { AntDesign } from '@expo/vector-icons';
import { TextInput, TouchableOpacity, View } from 'react-native';

export const ITEM_WIDTH = 220;

interface AddTodoInputProps<T> {
  value: T;
  onChangeText: (value: T) => void;
  placeholder: string;
  onPressAdd: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

export default ({
  value,
  onChangeText,
  placeholder,
  onPressAdd,
  onFocus,
  onBlur,
}: AddTodoInputProps<string>) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: ITEM_WIDTH,
        alignItems: 'center',
        alignSelf: 'center',
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={{ flex: 1, padding: 5, color: '#595959' }}
        onSubmitEditing={onPressAdd}
        onBlur={onBlur}
        blurOnSubmit={false}
        onFocus={onFocus}
      />
      <TouchableOpacity
        style={{ padding: 5 }}
        onPress={onPressAdd}
      >
        <AntDesign
          name='plus'
          size={18}
          color='#595959'
        />
      </TouchableOpacity>
    </View>
  );
};
