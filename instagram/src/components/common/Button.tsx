import { PropsWithChildren } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  hitSlop?: number;
  style?: StyleProp<ViewStyle>;
  opacity?: number;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

export default function Button({
  onPress,
  hitSlop,
  children,
  style,
  opacity,
  onPressIn,
  onPressOut,
}: PropsWithChildren<ButtonProps>) {
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
