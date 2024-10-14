import { useState } from 'react';
import { TextInput, View } from 'react-native';

export default ({ value, onChangeText, placeholder, style, fontSize, onSubmitEditing }) => {
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
        style={{ ...style, fontSize: fontSize || 20 }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};
