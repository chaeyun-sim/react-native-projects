import { Text } from 'react-native';

export default function Typography({ color, fontSize, children, style }) {
  return <Text style={{ color, fontSize, ...style }}>{children}</Text>;
}
