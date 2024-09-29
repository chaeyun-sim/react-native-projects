import { Text, TouchableOpacity, View } from 'react-native';

const COLUMN_SIZE = 35;

export default ({
  text,
  color,
  onPress,
  disabled,
  isSelected,
  hasTodo,
}: {
  text: string;
  color: string;
  onPress?: () => void;
  disabled?: boolean;
  isSelected?: boolean;
  hasTodo?: boolean;
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        width: COLUMN_SIZE,
        height: COLUMN_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSelected ? '#c2c2c2' : 'transparent',
        borderRadius: COLUMN_SIZE / 2,
      }}
    >
      <Text style={{ color, fontWeight: hasTodo ? 'bold' : 'normal' }}>{text}</Text>
    </TouchableOpacity>
  );
};
