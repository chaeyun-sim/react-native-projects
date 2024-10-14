import { Text } from 'react-native';

export default function Typography({ color, fontSize, children, style, numberOfLines }) {
  return (
    <Text
      style={{ color, fontSize, ...style }}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}
