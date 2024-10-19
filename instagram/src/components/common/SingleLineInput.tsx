import { useState } from 'react';
import { StyleProp, TextInput, TextStyle, View } from 'react-native';

interface SingleLineInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  fontSize: number;
  onSubmitEditing: () => void;
  style: StyleProp<TextStyle>;
}

export default function SingleLineInput({
  value,
  onChangeText,
  placeholder,
  style,
  fontSize,
  onSubmitEditing,
}: SingleLineInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={{
        alignSelf: 'stretch',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: isFocused ? 'black' : 'gray',
      }}
    >
      <TextInput
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[style, { fontSize: fontSize || 20 }]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
}
