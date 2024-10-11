import { TouchableOpacity } from 'react-native';

export default function Button({
  onPress,
  hitSlop,
  children,
  style,
  opacity,
  onPressIn,
  onPressOut,
}) {
  return (
    <TouchableOpacity
      activeOpacity={opacity}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      hitSlop={hitSlop}
      style={style}
    >
      {children}
    </TouchableOpacity>
  );
}
