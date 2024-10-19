import { PropsWithChildren } from 'react';
import { ColorValue, StyleProp, Text, TextStyle } from 'react-native';

interface TypographyProps {
  color?: ColorValue;
  fontSize?: number;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

export default function Typography({
  color,
  fontSize,
  children,
  style,
  numberOfLines,
}: PropsWithChildren<TypographyProps>) {
  return (
    <Text
      style={[{ color, fontSize }, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}
